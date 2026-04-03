import { useEffect, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../store/authStore";

import profile from "../../assets/icons/profile.png";
import { updateMe, updatePassword } from "../../api/authApi";

const UserSettingPage = () => {
  const { user, updateUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const { form, setForm, handleFieldChange } = useForm({
    username: user.username,
    email: user.email,
    bio: user.bio || `안녕하세요, ${user.username}입니다!`,
    profileImage: user.profileImage || profile,
    password: "",
    currentPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedFields = Object.keys(form).reduce((acc, key) => {
        if (key === "password" || key === "currentPassword") return acc;
        if (form[key] !== user[key]) acc[key] = form[key];
        return acc;
      }, {});

      if (Object.keys(updatedFields).length > 0) {
        const { data } = await updateMe(updatedFields);
        updateUser(data.user);
      }

      if (form.password) {
        await updatePassword({
          currentPassword: form.currentPassword,
          newPassword: form.password
        });
      }

      setIsEditing(false);
    } catch (error) {
      setError(err.response?.data?.message || "수정에 실패했습니다.");
    }
  };

  const handleCancle = () => {
    setForm({
      username: user.username,
      email: user.email,
      bio: user.bio || `안녕하세요, ${user.username}입니다!`,
      profileImage: user.profileImage,
    });
    setIsEditing(false);
  };

  return (
    <div className="user__inner container">
      <header className="user__header">
        <div className="user__profile"><img src={user.profileImage || profile} alt="프로필" /></div>
        <div className="user__username">
          <span>{user.username}</span>
        </div>
        <div className="user__email">
          <span>{user.email}</span>
        </div>
      </header>

      <div className="user__details">
        <form onSubmit={handleSubmit} className="user__form">
          <div className="user__form-box">
            <div className="auth__box auth__username">
              <label htmlFor="username">닉네임</label>
              <input
                id="username"
                type="username"
                name="username"
                value={form.username}
                onChange={handleFieldChange}
                placeholder="닉네임을 입력하세요."
                disabled={!isEditing}
              />
            </div>
            <div className="auth__box auth__email">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleFieldChange}
                placeholder="이메일을 입력하세요."
                disabled={!isEditing}
              />
            </div>
            <div className="auth__box auth__bio">
              <label htmlFor="bio">소개</label>
              <textarea
                id="bio"
                type="bio"
                name="bio"
                value={form.bio}
                onChange={handleFieldChange}
                placeholder="소개를 작성해주세요."
                disabled={!isEditing}
              />
            </div>
            <div className="auth__box auth__password">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleFieldChange}
                placeholder="비밀번호를 입력하세요."
                disabled={!isEditing}
              />
            </div>
            {isEditing && form.password && (
              <div className="auth__box auth__password-confirm">
                <label htmlFor="currentPassword">현재 비밀번호 확인</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleFieldChange}
                  placeholder="현재 비밀번호를 입력하세요."
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>

          <div className="user__button-box">
            {!isEditing ? (
              <button type="button" onClick={() => setIsEditing(true)} className="user__edit-btn">
                수정
              </button>
            ) : (
              <>
                {error && <p className="error-msg">{error || "비밀번호가 일치하지 않습니다."}</p>}
                <button type="button" onClick={handleCancle} className="user__edit-btn">
                  취소
                </button>
                <button type="submit" className="user__edit-btn">
                  완료
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSettingPage