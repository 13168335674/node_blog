var express = require("express");
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/* GET users listing. */
router.get("/list", function (req, res, next) {
  const { keyword = "" } = req.query;
  let author = req.query.author;
  // if (req.query.isadmin) {
  //   const loginCheckResult = await loginCheck(req);
  //   if (loginCheckResult) {
  //     return loginCheckResult;
  //   }
  //   author = req.session.username;
  // }
  const result = getList(author, keyword);
  return result
    .then(listData => {
      res.json(new SuccessModel(listData));
    })
    .catch(err => {
      res.json(new ErrorModel([]));
    });
});

module.exports = router;
