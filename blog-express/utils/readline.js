/*
 * @Author: ADI
 * @Date: 2021-03-13 11:48:10
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 11:56:39
 */
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const fileName = path.join(__dirname, "../../logs/access.log");
const readStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
  input: readStream,
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on("line", lineData => {
  if (!lineData) return;
  sum++;
  const arr = lineData.split(" -- ");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    chromeNum++;
  }
});
rl.on("close", () => {
  console.log("chrome 占比", chromeNum / sum);
});
