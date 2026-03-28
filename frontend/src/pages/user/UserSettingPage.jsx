import profileImg from "../../assets/images/profile.jpg";
import { useForm } from "../../hooks/useForm";

const UserSettingPage = () => {

  const { form, setForm, handleFieldChange } = useForm({
    username: "",
    email: "",
    password: "",
    profileImage: "",
    bio: "",
  });

  const handleSubmit = () => { };

  return (
    <div className="user__inner container">
      <header className="user__header">
        <div className="user__profile"><img src={profileImg} alt="" /></div>
        <div className="user__username">
          <span>test</span>
        </div>
        <div className="user__email">
          <span>test</span>
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
              required
            />
          </div>
          <div className="auth__box">
            <label htmlFor="bio">소개</label>
            <input
              id="bio"
              type="bio"
              name="bio"
              value={form.bio}
              onChange={handleFieldChange}
              placeholder="소개를 작성해주세요."
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
              required
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSettingPage