/*
 * @Author: ADI
 * @Date: 2021-02-27 11:39:57
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 09:40:06
 */
const querystring = require("querystring");
const handleBlogRouter = require("./src/route/blog");
const handleUserRouter = require("./src/route/user");
const getPostData = req => {
  return new Promise((resolve, reject) => {
    const { method } = req;
    if (method !== "POST") {
      return resolve({});
    }
    if (req.headers["content-type"] !== "application/json") {
      return resolve({});
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        return resolve({});
      }
      resolve(JSON.parse(postData));
    });
  });
};
const { get } = require("./src/db/redis");
const getCoolieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

module.exports.serverHandle = async (req, res) => {
  const { method, url, query, headers } = req;
  res.setHeader("Content-type", "application/json");
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);
  req.cookie = {};
  const cookieStr = headers.cookie || "";
  cookieStr.split(";").forEach(item => {
    if (!item) return;
    const arr = item.split("=").map(str => str.trim());
    const [key, val] = arr;
    req.cookie[key] = val;
  });
  // session
  let needSetCookie = false;
  let { sessionId } = req.cookie;
  if (sessionId) {
    needSetCookie = false;
  } else {
    needSetCookie = true;
    sessionId = `${Date.now()}_${Math.random()}`;
    req.cookie.sessionId = sessionId;
  }
  req.session = (await get(sessionId)) || {};
  console.log("req.session", req.session, sessionId);

  getPostData(req).then(postData => {
    req.body = postData;
    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `sessionId=${sessionId}; path=/; httpOnly; expires=${getCoolieExpires()}`,
          );
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    console.log("blogResult", blogResult);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `sessionId=${sessionId}; path=/; httpOnly; expires=${getCoolieExpires()}`,
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found/n");
    res.end();
  });
};
