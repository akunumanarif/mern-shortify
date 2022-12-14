const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    customSlug: {
      type: String,
      required: true,
      unique: true,
    },
    resultUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("url", urlSchema);
