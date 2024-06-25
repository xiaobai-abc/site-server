const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const setting = require("../../mongo/schema/setting");
const SettingModel = mongoose.model("Setting", setting.SettingSchema);

router.get("/", function (req, res) {
  // 这里理论是进不来的 当我啥都没说
  res.send("this is home");
});

router.get("/home", async function (req, res) {
  const settingData = await SettingModel.findOne(void 0, { _id: false }).exec();
  console.clear();

  res.status(200).send({
    code: 200,
    data: settingData,
    messgae: "zxczxc"
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
    next();
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
