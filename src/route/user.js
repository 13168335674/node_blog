/*
 * @Author: ADI
 * @Date: 2021-02-27 12:34:07
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 10:01:10
 */
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { get, set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const { method, url } = req;

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 操作session
        req.session["username"] = data.username;
        req.session["realname"] = data.realname;
        set(req.cookie.sessionId, req.session);
        return new SuccessModel("登录成功");
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
};

module.exports = handleUserRouter;
