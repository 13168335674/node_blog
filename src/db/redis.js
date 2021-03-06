/*
 * @Author: ADI
 * @Date: 2021-03-07 12:19:51
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-12 20:31:57
 */
const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error("err", err);
});
function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        console.log("redis err", err);
        return reject(err);
      }
      if (val == null) {
        return resolve(null);
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
      console.log("redis success", val);
    });
  });
}

module.exports = {
  set,
  get,
};
