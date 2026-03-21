const { cloudinary } = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "이미지가 없습니다." });
    }

    res.status(201).json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    console.error("이미지 업로드 실패", error);
    res.status(500).json({ message: "이미지 업로드 실패" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
  } catch (error) {
    console.error("이미지 삭제 실패", error);
  }
};