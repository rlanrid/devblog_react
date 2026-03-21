const express = require("express");
const router = express.Router();

const { upload } = require("../config/cloudinary");
const { uploadImage, deleteImage } = require("../controllers/uploadController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:publicId", protect, deleteImage);

module.exports = router;