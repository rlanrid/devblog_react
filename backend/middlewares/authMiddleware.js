const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 토큰 존재 여부 확인
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const token = authHeader.split(" ")[1]; // 토큰 추출

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // 비밀번호 제외
    next();
  } catch (error) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};