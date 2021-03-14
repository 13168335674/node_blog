/*
 * @Author: ADI
 * @Date: 2021-03-14 10:33:19
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-14 10:34:30
 */
const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.json(new ErrorModel("未登录"));
  }
};
