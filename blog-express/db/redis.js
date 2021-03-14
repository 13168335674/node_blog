/*
 * @Author: ADI
 * @Date: 2021-03-07 12:19:51
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-14 10:27:42
 */
const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error("err", err);
});

module.exports = redisClient;
