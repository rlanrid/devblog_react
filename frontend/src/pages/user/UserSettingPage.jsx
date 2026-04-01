import { useEffect, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";

import { getMe } from "../../api/authApi";

const UserSettingPage = () => {

  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const { form, setForm, handleFieldChange } = useForm({
    username: "",
    email: "",
    profileImage: "",
    bio: "",
  });

  const loadUser = async () => {
    try {
      const { data } = await getMe();
      setForm({
        username: data.user.username,
        email: data.user.email,
        profileImage: data.user.profileImage || null,
        bio: data.user.bio,
      });
    } catch (error) {
      console.error("유저 정보 불러오기 실패", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSubmit = () => { };

  return (
    <div className="user__inner container">
      <header className="user__header">
        <div className="user__profile"><img src={form.profileImage || null} alt="프로필" /></div>
        <div className="user__username">
          <span>{form.username}</span>
        </div>
        <div className="user__email">
          <span>{form.email}</span>
        </div>
      </header>

      <div className="user__details">
        {/* <h2 className="user__user-info">개인정보</h2> */}
        <form onSubmit={handleSubmit} className="user__form">
          <div className="auth__box">
            <label htmlFor="username">닉네임</label>
            <input
              id="username"
              type="username"
              name="username"
              value={form.username}
              onChange={handleFieldChange}
              placeholder="닉네임을 입력하세요."
              disabled={!isEditing}
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
              onChange={handleFieldChange}
              placeholder="이메일을 입력하세요."
              disabled={!isEditing}
              required
            />
          </div>
          <div className="auth__box">
            <label htmlFor="bio">소개</label>
            <textarea
              id="bio"
              type="bio"
              name="bio"
              value={form.bio}
              onChange={handleFieldChange}
              placeholder="소개를 작성해주세요."
              disabled={!isEditing}
              required
            />
          </div>
          <div className="auth__box">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value="*********"
              onChange={handleFieldChange}
              placeholder="비밀번호를 입력하세요."
              disabled={!isEditing}
              required
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSettingPage