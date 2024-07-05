const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const setting = require("../../mongo/schema/setting");
const writing = require("../../mongo/schema/copywriting");
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
  console.clear();

  res.status(200).send({
    code: 200,
    data: settingData,
    messgae: "success"
  });
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

// 测试接口
router.get(
  "/test",
  function (req, res, next) {
    res.status(200).send({
      code: 200,
      data: "asd",
      messgae: "测试asd数据"
    });
    return;
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

module.exports = router;
