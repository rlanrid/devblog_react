const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    content: {
      type: String,
      required: true,
    },
    info: {
      author: {
        type: String,
        default: "Anonymous",
        index: true,
      },
      view: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    summary: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
      index: true
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ createdAt: -1 });

postSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Post", postSchema);