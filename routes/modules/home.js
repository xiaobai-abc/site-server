const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const marked = require("marked");

const setting = require("../../mongo/schema/setting");
const writing = require("../../mongo/schema/copywriting");
const { default: axios } = require("axios");
const SettingModel = mongoose.model("Setting", setting.SettingSchema);
const writingModel = mongoose.model("Copywriting", writing.writeSchema);

router.get("/", function (req, res) {
  // 这里理论是进不来的 当我啥都没说
  res.send({
    code: 200,
    data: null,
    message: "this is home"
  });
});

router.get("/home", async function (req, res) {
  const settingData = await SettingModel.findOne(void 0, { _id: false }).exec();

  res.status(200).send({
    code: 200,
    data: settingData,
    messgae: "success"
  });
});

router.get("/home/md", async function (req, res) {
  try {
    axios
      .get(
        "https://raw.githubusercontent.com/xiaobai-abc/notes/main/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0.md"
      )
      .then((mdFileStr) => {
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

router.get("/write", async function (req, res) {
  const { page = 1, pageSize = 10 } = req.query;
  const data = await writingModel
    .find(void 0, { _id: false })
    .skip(page * pageSize - pageSize)
    .limit(pageSize)
    .lean();
  const count = await writingModel.countDocuments().exec();
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  res.status(200).send({
    code: 200,
    data: {
      list: data.map((item) => {
        return {
          ...item,
          describe: truncateString(item.describe, 20)
        };
      }),
      total: count
    },
    messgae: "success"
  });
});

router.post("/write/add", async function (req, res) {
  const params = req.body;
  const coumaxIdDocnt = await writingModel.findOne().sort({ id: -1 }).exec();
  const maxId = coumaxIdDocnt ? coumaxIdDocnt.id : 0;

  const newWriting = new writingModel({
    ...params,
    id: maxId
  });

  try {
    await newWriting.save();
    res.send({
      code: 200,
      data: null,
      messgae: "添加成功"
    });
  } catch (error) {
    res.send({
      code: 0,
      data: error,
      messgae: "添加失败"
    });
  }
});

router.get("/write/detail", async function (req, res) {
  const { id } = req.query;
  const data = await writingModel.findOne({ id }, { _id: false }).lean().exec();
  res.status(200).send({
    code: 200,
    data: data,
    messgae: "success"
  });
});

module.exports = router;
