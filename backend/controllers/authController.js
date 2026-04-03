const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT 발급
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// 회원가입
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "가입된 정보가 없습니다." });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 내 정보 조회
exports.getMe = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 내 정보 업데이트
exports.updateMe = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { returnDocument: 'after', runValidators: true }
    ).select("-password");

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("password");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "현재 비밀번호가 틀렸습니다." });
    }

    user.password = newPassword;
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};