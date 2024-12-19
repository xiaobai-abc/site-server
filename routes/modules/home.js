const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();
const marked = require("marked");
const { client } = require("../../postgre");

// const setting = require("../../mongo/schema/setting");
// const writing = require("../../mongo/schema/copywriting");
const { default: axios } = require("axios");
// const SettingModel = mongoose.model("Setting", setting.SettingSchema);
// const writingModel = mongoose.model("Copywriting", writing.writeSchema);

router.get("/", function (req, res) {
  // 这里理论是进不来的 当我啥都没说
  res.send({
    code: 200,
    data: null,
    message: "this is home"
  });
});

// 获取所有图库
router.get("/pictures", function (req, res) {
  const { page = 1, pageSize = 100 } = req.query;
  const query = `SELECT * FROM pictures;`;
  const query1 = `SELECT * 
FROM pictures
ORDER BY id ASC
LIMIT ${pageSize} OFFSET (${page}-1) * ${pageSize} ;`;
  client
    .query(query1)
    .then((resp) => {
      res.status(200).send({
        code: 1,
        data: {
          rows: resp.rows
        },
        messgae: "success"
      });
    })
    .catch((err) => {
      res.status(200).send({
        code: 0,
        data: err,
        messgae: "err"
      });
    });
});

router.get("/home", async function (req, res) {
  // const settingData = await SettingModel.findOne(void 0, { _id: false }).exec();
  // const { type } = req.query;
  // if (type == "error") {
  //   res.status(401).send({
  //     code: 401,
  //     data: "错误测试",
  //     messgae: "success"
  //   });
  //   return;
  // }
  // res.status(200).send({
  //   code: 200,
  //   data: settingData,
  //   messgae: "success"
  // });
  res.status(200).send({
    code: 200,
    data: [],
    messgae: "success"
  });
});

router.get("/home/md", async function (req, res) {
  try {
    axios.get("https://xiaobai-abc.cn/static/markdown.md").then((mdFileStr) => {
      const html = marked.parse(mdFileStr.data);
      res.status(200).send({
        code: 200,
        data: html,
        messgae: "success"
      });
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: error,
      messgae: "success"
    });
  }
});

router.get("/wenan-shici", function (req, res) {
  axios
    // .get("https://zj.v.api.aa1.cn/api/wenan-shici/?type=json")
    .get("https://v1.hitokoto.cn/")
    .then((response) => {
      console.clear();
      res.status(200).send({
        code: 200,
        data: response.data,
        messgae: "success"
      });
    })
    .catch((error) => {
      res.status(500).send({
        code: 500,
        data: error,
        messgae: "success"
      });
    });
});

router.get("/write", async function (req, res) {
  // const { page = 1, pageSize = 10 } = req.query;
  // const data = await writingModel
  //   .find(void 0, { _id: false })
  //   .skip(page * pageSize - pageSize)
  //   .limit(pageSize)
  //   .lean();
  // const count = await writingModel.countDocuments().exec();
  // function truncateString(str, num) {
  //   if (str.length <= num) {
  //     return str;
  //   }
  //   return str.slice(0, num) + "...";
  // }

  // res.status(200).send({
  //   code: 200,
  //   data: {
  //     list: data.map((item) => {
  //       return {
  //         ...item,
  //         describe: truncateString(item.describe, 20)
  //       };
  //     }),
  //     total: count
  //   },
  //   messgae: "success"
  // });

  res.status(200).send({
    code: 200,
    data: {
      list: []
    },
    messgae: "success"
  });
});

router.post("/write/add", async function (req, res) {
  // const params = req.body;
  // const coumaxIdDocnt = await writingModel.findOne().sort({ id: -1 }).exec();
  // const maxId = coumaxIdDocnt ? coumaxIdDocnt.id : 0;

  // const newWriting = new writingModel({
  //   ...params,
  //   id: maxId
  // });

  // try {
  //   await newWriting.save();
  //   res.send({
  //     code: 200,
  //     data: null,
  //     messgae: "添加成功"
  //   });
  // } catch (error) {
  //   res.send({
  //     code: 0,
  //     data: error,
  //     messgae: "添加失败"
  //   });
  // }

  res.send({
    code: 200,
    data: null,
    messgae: "禁用"
  });
});

router.get("/write/detail", async function (req, res) {
  // const { id } = req.query;
  // const data = await writingModel.findOne({ id }, { _id: false }).lean().exec();
  // res.status(200).send({
  //   code: 200,
  //   data: data,
  //   messgae: "success"
  // });
  res.status(200).send({
    code: 200,
    data: [],
    messgae: "success"
  });
});

module.exports = router;
