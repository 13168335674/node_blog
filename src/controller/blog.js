/*
 * @Author: ADI
 * @Date: 2021-02-28 13:19:31
 * @LastEditors: ADI
 * @LastEditTime: 2021-03-07 10:31:30
 */
const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  const { title, content, createtime, author } = blogData;
  const sql = `
    insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createtime}, '${author}')
  `;
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `;
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

const delBlog = (id, author) => {
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `;
  return exec(sql).then((data) => {
    if (data.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
