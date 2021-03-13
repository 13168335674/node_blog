/*
 * @Author: ADI
 * @Date: 2021-03-13 10:15:05
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-13 10:23:00
 */
const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");

// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.log("err", err);
//     return;
//   }
//   console.log("data", data.toString());
// });

// const content = "新加的内容\n";
// const opt = {
//   flag: "a",
// };
// fs.writeFile(fileName, content, opt, err => {
//   if (err) {
//     console.log("err", err);
//   }
// });

// fs.exists(fileName, exist => {
//   console.log("exist", exist);
// });
