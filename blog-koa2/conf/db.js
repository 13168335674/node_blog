/*
 * @Author: ADI
 * @Date: 2021-03-06 12:02:01
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 12:19:38
 */
const env = process.env.NODE_ENV;

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "adi123456",
  port: "3306",
  database: "myblog"
};
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1"
};

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "adi123456",
    port: "3306",
    database: "myblog"
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "adi123456",
    port: "3306",
    database: "myblog"
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
