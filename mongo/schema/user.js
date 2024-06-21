const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true //字段是否唯一
  },
  password: String,
  nickname: String,
  avatar: String,
  rule: Number,
  description: String
});

module.exports = {
  UserSchema
};
