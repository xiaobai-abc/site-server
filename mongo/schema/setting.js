const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true //字段是否唯一
  },
  link: Array
});

module.exports = {
  SettingSchema
};
