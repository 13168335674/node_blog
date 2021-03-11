/*
 * @Author: ADI
 * @Date: 2021-03-07 12:12:08
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 12:16:12
 */
const redis = require("redis");

const redisClient = redis.createClient(6379, "127.0.0.1");
redisClient.on("error", (err) => {
  console.log("err", err);
});

redisClient.set("myname2", "adi", redis.print);
redisClient.get("myname2", (err, val) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("val", val);
  redisClient.quit();
});
