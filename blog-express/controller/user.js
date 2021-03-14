const { exec, escape } = require("../db/mysql");

/*
 * @Author: ADI
 * @Date: 2021-02-28 14:49:36
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-14 09:27:39
 */
const login = (username, password) => {
  [username, password].map(arg => {
    arg = escape(arg);
  });
  const sql = `
    select  username, realname from users where username="${username}" and password="${password}"
  `;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
};

module.exports = {
  login,
};
