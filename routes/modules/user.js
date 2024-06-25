const express = require("express");
const mongoose = require("mongoose");
const md5 = require("js-md5");
const jwt = require("../jwt/index");
const request = require("request");

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
    const user = await UserModel.findOne(
      {
        username: decoded.username
      },
      {
        password: false,
        _id: false
      }
    ).exec();
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

router.post(
  "/login/test",
  function (req, response, next) {
    const { url, method = "GET",...props } = req.body;
    const base = "https://api.meseequick.com";
    console.log(base + url, ">>>>>>>>>>");
    request(
      {
        url: base + url,
        body: {
          ...props
        },
        json: true,
        method: method,
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21lc2VlYWdyby5jb20iLCJpYXQiOjE3MTkyMDk0NzAsImV4cCI6MTcxOTIxMzA3MCwidWlkIjoiMjI3MDA2MDI0NTQzODAyNDMifQ.nejSN1lwbveY2cYc3y7NlaldKu9wDQambxb-Al6RoNo"
        }
      },
      (err, res, body) => {
        if (err) {
          response.status(403).send({
            code: 0,
            data: null,
            message: "接口响应失败~~~"
          });
          next();
          return;
        }
        response.status(200).send(res.body);
        // next();
      }
    );
  },
  function (req, res) {
    res.status(200).send({
      code: 200,
      data: null,
      message: "zxczx"
    });
  }
);

module.exports = router;
