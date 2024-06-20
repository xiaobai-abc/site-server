const express = require("express");
const mongoose = require("mongoose");
const user = require("../../mongo/schema/user");

const UserModel = mongoose.model("User", user.UserSchema);
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond user api root");
});

router.post(
  "/login",
  async function (req, res, next) {
    console.log(">>>>>>>>>>>>");

    const a = await UserModel.find({});
    console.log("zxczxcxz", a);

    next();
  },
  function (req, res) {
    res.status(200).send({
      code: 200,
      data: {},
      message: "登录成功"
    });
  }
);

module.exports = router;
