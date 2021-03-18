/*
 * @Author: ADI
 * @Date: 2021-03-16 19:47:31
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-16 20:07:26
 */
const http = require("http");

const serve = http.createServer((req, res) => {
  console.log("111", 111);
  console.error("222", req.url);
  if (req.url === "/err") {
    throw new Error("err");
  }
  res.end("app server 3");
});

serve.listen(3000);
