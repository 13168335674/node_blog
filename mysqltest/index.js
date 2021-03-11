/*
 * @Author: ADI
 * @Date: 2021-03-06 11:38:06
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 10:31:21
 */
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "adi123456",
  port: "3306",
  database: "myblog"
});

con.connect();

let sql = "select id, username, realname from users;";
sql = "select * from blogs;";
// sql = "update users set realname='李四2' where username='lisi'";
// sql =
//   "insert into blogs (title, content, createtime, author) values ('标题B', '内容B', 1615000921264, 'lisi')";
con.query(sql, (err, res) => {
  if (err) {
    console.error("err", err);
    return;
  }
});

con.end();
