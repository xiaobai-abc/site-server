const express = require("express");
const router = express.Router();
const marked = require("marked");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { client } = require("../../postgre");

//  测试添加图片列表数据
router.get("/add-pictures", async function (req, res) {
  console.log(req.originalUrl);

  // const result = await axios("https://xiaobai-abc.cn/static/images/");
  // const htmlStr = result.data;

  // const regex = /href=["'](.*?\.(jpg|png|jpeg))["']/g;
  // const regexName = /[^/\\&?]+(?=\.[a-zA-Z]{2,6}($|\?))/;

  // let match;
  // const fileList = [];
  // const url = "https://xiaobai-abc.cn/static/images/";
  // while ((match = regex.exec(htmlStr))) {
  //   // fileList.push(`${url}${match[1]}`);
  //   fileList.push({
  //     url: `${url}${match[1]}`,
  //     name: match[1].match(regexName)[0],
  //     type: 1
  //   });
  // }
  // const newList = fileList.splice(397);

  // // 批量插入的 SQL 查询
  // const insertQuery = `
  //     INSERT INTO pictures (type, url, name)
  //     VALUES ${newList
  //       .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
  //       .join(", ")}
  //     RETURNING id, type, url, name;
  //   `;

  // const values = newList.map((item) => [item.type, item.url, item.name]).flat();

  // client
  //   .query(insertQuery, values)
  //   .then((resp) => {
  //     res.status(200).send({
  //       code: 200,
  //       data: {
  //         a: fileList,
  //         c: resp
  //       },
  //       messgae: "success"
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       code: 500,
  //       data: err,
  //       messgae: "error"
  //     });
  //   });

  res.status(200).send({
    code: 200,
    data: {},
    messgae: "测试结束"
  });
});

// 测试接口
router.get("/", async function (req, res) {
  console.log(req.originalUrl);

  res.status(200).send({
    code: 200,
    data: [],
    messgae: "success"
  });

  //
  // client
  //   .query("SELECT * FROM pictures;")
  //   .then((resp) => {
  //     res.status(200).send({
  //       code: 200,
  //       data: resp.rows,
  //       messgae: "success"
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(200).send({
  //       code: 200,
  //       data: err,
  //       messgae: "err"
  //     });
  //   });
});

// .setHeader("Content-Type", "application/json")
router.get("/status", function (req, res) {
  const { code } = req.query;
  const codeList = ["200", "404", "500"];

  if (codeList.includes(code)) {
    res.status(Number(code)).send({
      code: Number(code),
      data: {},
      messgae: "响应数据~~~"
    });
    return;
  } else {
    res.status(200).send({
      code: null,
      data: {},
      messgae: "无对应展示码"
    });
  }
});

router.get("/v", function (req, res) {
  res.status(200).send({
    code: null,
    data: [],
    messgae: "无对应展示码"
  });
});

module.exports = router;
