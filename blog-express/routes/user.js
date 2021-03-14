var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/* GET users listing. */
router.post("/login", function (req, res, next) {
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
});

module.exports = router;
