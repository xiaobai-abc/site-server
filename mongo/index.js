const mongoose = require("mongoose");

async function mongodbStart(callback) {
  const mongoo = await mongoose.connect("mongodb://xiaobai-abc.cn:27017", {
    user: "root",
    pass: "123456",
    maxPoolSize: 50
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
