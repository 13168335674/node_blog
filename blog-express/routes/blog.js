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
const loginCheck = require("../middleware/loginCheck");

// 博客列表
router.get("/list", function (req, res, next) {
  const { keyword = "" } = req.query;
  let author = req.query.author;
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel("未登录"));
      return;
    }
    author = req.session.username;
  }
  const result = getList(author, keyword);
  return result
    .then(listData => {
      res.json(new SuccessModel(listData));
    })
    .catch(err => {
      res.json(new ErrorModel([]));
    });
});
// 博客详情
router.get("/detail", function (req, res, next) {
  const { id } = req.query;
  const result = getDetail(id);
  return result
    .then(data => {
      res.json(new SuccessModel(data));
    })
    .catch(err => {
      res.json(new ErrorModel([]));
    });
});

// 新建博客
router.post("/new", loginCheck, function (req, res, next) {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result
    .then(data => {
      res.json(new SuccessModel(data));
    })
    .catch(err => {
      res.json(new ErrorModel([]));
    });
});
// 更新博客
router.post("/update", loginCheck, function (req, res, next) {
  const result = updateBlog(req.query.id, req.body);
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("更新失败"));
    }
  });
});
// 删除博客
router.post("/del", loginCheck, function (req, res, next) {
  const result = delBlog(req.query.id, req.session.username);
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("删除失败"));
    }
  });
});

module.exports = router;
