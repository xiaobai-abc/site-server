const homeRouter = require("./modules/home");
const userRouter = require("./modules/user");
const testRouter = require("./modules/test");
const resolve = require("path").resolve;

const BASE_PATH = "/api"; // 路由前缀

function setUpRouter(app) {
  app.use(BASE_PATH, homeRouter);
  app.use(resolve(BASE_PATH, "user"), userRouter);
  app.use(resolve(BASE_PATH, "test"), testRouter);
}

module.exports = {
  setUpRouter
};
