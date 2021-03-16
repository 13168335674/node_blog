/*
 * @Author: ADI
 * @Date: 2021-03-14 10:33:19
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-15 20:03:09
 */
const { ErrorModel } = require("../model/resModel");

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
  } else {
    ctx.body = new ErrorModel("未登录");
  }
};
