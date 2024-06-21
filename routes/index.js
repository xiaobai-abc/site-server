const homeRouter = require("./modules/home");
const userRouter = require("./modules/user");

const BASE_PATH = "/api"; // 路由前缀
const resolve = require("path").resolve;

function setUpRouter(app) {
  app.use(BASE_PATH, homeRouter);
  app.use(resolve(BASE_PATH, "user"), userRouter);
}

module.exports = {
  setUpRouter
};
