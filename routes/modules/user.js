const express = require("express");
const mongoose = require("mongoose");
const md5 = require("js-md5");
const jwt = require("../jwt/index");

const user = require("../../mongo/schema/user");

const router = express.Router();
const UserModel = mongoose.model("User", user.UserSchema);
const { TokenUtil } = jwt;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond user api root");
});

router.post(
  "/login",
  async function (req, res, next) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      username,
      password: md5(password)
    }).exec();

    if (user) {
      const token = TokenUtil.sign(user.username);
      req.data = token;
    }
    next();
  },
  function (req, res) {
    if (req.data) {
      res.status(200).send({
        code: 200,
        data: {
          token: req.data
        },
        message: "登录成功"
      });
    } else {
      res.status(403).send({
        code: 403,
        data: {},
        message: "账户密码错误"
      });
    }
  }
);

router.get("/verify", async function (req, res) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({
      code: 0,
      data: null,
      message: "未登录~~~"
    });
    return;
  }
  const decoded = TokenUtil.verify(token.split("Bearer ")[1]);

  if (decoded) {
    const user = await UserModel.findOne({
      username: decoded.username
    }).exec();
    res.status(200).send({
      code: 200,
      data: {
        userInfo: user
      },
      message: "获取信息~~~"
    });
  } else {
    res.status(401).send({
      code: 0,
      data: null,
      message: "登录过期~~~"
    });
  }
});

module.exports = router;
