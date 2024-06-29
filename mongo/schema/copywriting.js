const mongoose = require("mongoose");

const writeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true //字段是否唯一
  },
  title: String,
  describe: String,
  video: String
});

module.exports = {
  writeSchema
};
