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
      res.json(new SuccessModel("登录成功"));
    } else {
      res.json(new ErrorModel("登录失败"));
    }
  });
});
router.get("/login-test", (req, res, next) => {
  if (req.session.username) {
    res.json(new SuccessModel("登录成功"));
  } else {
    res.json(new ErrorModel("未登录"));
  }
});
// router.get("/session-test", (req, res, next) => {
//   const { session } = req;
//   if (session.viewNum == null) {
//     session.viewNum = 0;
//   } else {
//     session.viewNum++;
//   }
//   res.json({
//     viewNum: session.viewNum,
//   });
// });

module.exports = router;
