/*
 * @Author: ADI
 * @Date: 2021-03-13 10:32:36
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 10:34:39
 */
const fs = require("fs");
// process.stdin.pipe(process.stdout);

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    req.pipe(res);
  }
});
server.listen(8003);
