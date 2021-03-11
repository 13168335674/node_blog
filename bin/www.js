/*
 * @Author: ADI
 * @Date: 2021-02-27 12:30:17
 * @LastEditors: ADI
 * @LastEditTime: 2021-02-28 13:36:24
 */
const http = require("http");
const POST = 8080;
const { serverHandle } = require("../app.js");
const server = http.createServer(serverHandle);
server.listen(POST);
console.info(`runing ${POST}...`);
