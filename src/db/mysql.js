/*
 * @Author: ADI
 * @Date: 2021-03-06 12:05:26
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 10:31:41
 */
const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

console.dir("MYSQL_CONF", MYSQL_CONF);
const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

module.exports = {
  exec
};
