/*
 * @Author: ADI
 * @Date: 2021-02-27 12:34:07
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 12:35:45
 */
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

const handleBlogRouter = (req, res) => {
  const { method, url, query = {} } = req;
  const { id } = query;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const { author = "", keyword = "" } = query;
    const result = getList(author, keyword);
    return result
      .then((listData) => {
        return new SuccessModel(listData);
      })
      .catch((err) => {
        return new ErrorModel([]);
      });
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const result = getDetail(id);
    return result
      .then((data) => {
        return new SuccessModel(data);
      })
      .catch((err) => {
        return new ErrorModel([]);
      });
  }
  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const result = updateBlog(id, req.body);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新失败");
      }
    });
  }
  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const result = delBlog(id, req.session.username);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除失败");
      }
    });
  }
  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result
      .then((data) => {
        return new SuccessModel(data);
      })
      .catch((err) => {
        return new ErrorModel([]);
      });
  }
};

module.exports = handleBlogRouter;
