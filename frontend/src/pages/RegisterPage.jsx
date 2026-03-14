import { useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { handleRegister } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (form.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = form;
      await handleRegister(submitData);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth__inner">
      <h1>회원가입</h1>

      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__box">
          <label htmlFor="username">사용자 이름</label>
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="사용자 이름을 입력하세요."
            required
          />
        </div>

        <div className="auth__box">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요."
            required
          />
        </div>

        <div className="auth__box">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="6자 이상의 비밀번호를 설정해주세요."
            required
          />
        </div>

        <div className="auth__box">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요."
            required
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  )
}

export default RegisterPage