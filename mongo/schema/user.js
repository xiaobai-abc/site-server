const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true //字段是否唯一
  },
  password: {
    type: String
  },
  nickname: {
    type: String
  }
});

module.exports = {
  UserSchema
};
