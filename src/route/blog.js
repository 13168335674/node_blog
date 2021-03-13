/*
 * @Author: ADI
 * @Date: 2021-02-27 12:34:07
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 09:57:42
 */
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { get, set } = require("../db/redis");

// 统一的登录验证函数
const loginCheck = req => {
  if (req.cookie.sessionId) {
    return get(req.cookie.sessionId).then(result => {
      console.log("loginCheck", result);
      if (result !== null) {
        return;
      }
      return Promise.resolve(new ErrorModel("登录失败"));
    });
  } else {
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

const handleBlogRouter = async (req, res) => {
  const { method, url, query = {} } = req;
  const { id } = query;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { keyword = "" } = query;
    let author = query.author;
    if (req.query.isadmin) {
      const loginCheckResult = await loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }
      author = req.session.username;
    }
    const result = getList(author, keyword);
    return result
      .then(listData => {
        return new SuccessModel(listData);
      })
      .catch(err => {
        return new ErrorModel([]);
      });
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetail(id);
    return result
      .then(data => {
        return new SuccessModel(data);
      })
      .catch(err => {
        return new ErrorModel([]);
      });
  }
  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    const result = updateBlog(id, req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新失败");
      }
    });
  }
  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    const result = delBlog(id, req.session.username);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除失败");
      }
    });
  }
  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    req.body.author = req.session.username;
    console.log("req.session.username", req.session.username);
    const result = newBlog(req.body);
    return result
      .then(data => {
        return new SuccessModel(data);
      })
      .catch(err => {
        return new ErrorModel([]);
      });
  }
};

module.exports = handleBlogRouter;
