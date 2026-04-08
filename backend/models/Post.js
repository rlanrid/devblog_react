const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: "https://res.cloudinary.com/devealb44/image/upload/v1774010276/DevBlog/hm2oab4mmakfjrm2soon.png",
    },
    thumbnailPublicId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    info: {
      views: {
        type: Number,
        default: 0,
      },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    tags: {
      type: [String],
      default: [],
      index: true
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 좋아요 숫자 가상 필드
postSchema.virtual("likeCount").get(function () {
  return this.info.likes.length;
});

postSchema.index({ createdAt: -1 });
postSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Post", postSchema);