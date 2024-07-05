const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const writeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true //字段是否唯一
  },
  title: String,
  describe: String,
  video: String,
  type: {
    type: String,
    enum: ["video", "image", "text"]
  }
});

writeSchema.statics.getNextId = async function (name) {
  const document = await this.findOneAndUpdate(
    { _id: name },
    { $inc: { id: 1 } },
    { new: true, upsert: true }
  );
  return document.id;
};

// writeSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = {
  writeSchema
};
