const express = require("express");
const router = express.Router();
const marked = require("marked");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

// 测试接口
router.get(
  "/",
  async function (req, res, next) {
    console.clear();
    console.log(req.originalUrl);
    // const files = fs.readFileSync("./routes/modules/test.md", "utf-8");
    // console.log(marked.parse(files));
    // next();
    // return;
    axios
      .get(
        // "https://raw.githubusercontent.com/xiaobai-abc/notes/main/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0.md"
        "https://xiaobai-abc.cn/static/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0.md"
      )
      .then((mdFileStr) => {
        console.log(marked.parse(mdFileStr.data));
      })
      .finally(() => {
        next();
      });
  },
  function (req, res) {
    res.status(200).send({
      code: 200,
      data: "测试数据",
      messgae: "测试数据"
    });
  }
);

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
