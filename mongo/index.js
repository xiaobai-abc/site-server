const mongoose = require("mongoose");

async function mongodbStart(callback) {
  const mongoo = await mongoose.connect("mongodb://xiaobai-abc.cn:27017/web", {
    user: "yadmin",
    pass: "123456",
    maxPoolSize: 50,
    authSource: "admin"
    // auth : {
    //   username : "root",
    //   password : "123456"
    // }
  });
  return mongoo;
}

module.exports = {
  mongodbStart
};
