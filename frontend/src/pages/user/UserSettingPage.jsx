import { useState } from "react";

import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../store/authStore";

import { updateMe, updatePassword } from "../../api/authApi";
import { deleteImage, uploadImage } from "../../api/uploadApi";

import { HiOutlineMinusCircle, HiOutlineUpload } from "react-icons/hi";

import profile from "../../assets/icons/profile.png";

const UserSettingPage = () => {
  const { user, updateUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const { form, setForm, handleFieldChange } = useForm({
    username: user.username,
    email: user.email,
    bio: user.bio || `안녕하세요, ${user.username}입니다!`,
    profileImage: user.profileImage || "",
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
      console.log("error")
      setError(error.response?.data?.message || "수정에 실패했습니다.");
    }
  };

  const handleCancle = () => {
    setForm({
      username: user.username,
      email: user.email,
      bio: user.bio || `안녕하세요, ${user.username}입니다!`,
      profileImage: user.profileImage,
      password: "",
      currentPassword: "",
    });
    setIsEditing(false);
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm(prev => ({ ...prev, profileImage: previewUrl }));

    setUploading(true);
    try {
      if (form.profileImage) {
        await deleteImage(form.profileImage);
      }

      const { data } = await uploadImage(file);
      setForm(prev => ({
        ...prev,
        profileImage: data.url,
        profileImagePublicId: data.public_id,
      }));
    } catch (error) {
      console.error("프로필 업로드 실패", error);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileRemove = () => {
    setForm(prev => ({
      ...prev,
      profileImage: "",
      profileImagePublicId: "",
    }));
  };

  return (
    <div className="user__inner container">
      <form onSubmit={handleSubmit}>
        <header className="user__header">
          <div className="user__profile">
            <img src={form.profileImage || profile} alt="프로필" />
            {isEditing && (
              <label className="user__profile-label">
                {form.profileImage == "" ? (
                  <>
                    <HiOutlineUpload />
                    <input type="file" accpet="image/*" onChange={handleProfileChange} />
                  </>
                ) : (
                  <>
                    <button type="button" onClick={handleProfileRemove}>
                      <HiOutlineMinusCircle />
                    </button>
                  </>
                )}
              </label>
            )}
          </div>
          <div className="user__username">
            <span>{user.username}</span>
          </div>
          <div className="user__email">
            <span>{user.email}</span>
          </div>
        </header>

        <div className="user__details">
          <div className="user__form">
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

            <div className="user__error-box">
              {error && <p className="error-msg">{error || "비밀번호가 일치하지 않습니다."}</p>}
            </div>

            <div className="user__button-box">
              {!isEditing ? (
                <button type="button" onClick={() => setIsEditing(true)} className="user__edit-btn">
                  수정
                </button>
              ) : (
                <>
                  <button type="button" onClick={handleCancle} className="user__edit-btn">
                    취소
                  </button>
                  <button type="submit" className="user__edit-btn">
                    완료
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSettingPage