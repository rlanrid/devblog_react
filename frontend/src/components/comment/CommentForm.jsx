import { HiCursorClick } from "react-icons/hi";

import NoProfile from "../../assets/icons/NoProfile.png";

import { useAuth } from "../../hooks/useAuth";

const CommentForm = ({ handleSubmit, content, setContent, user }) => {
  const { isLoggedIn } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="comment__form">
      <div className="comment__profile">
        <img src={user?.profileImage || NoProfile} alt="유저 프로필" />
      </div>

      {isLoggedIn() ? (
        <>
          <textarea
            name="comment"
            className="comment__textarea"
            rows={1}
            placeholder="댓글을 작성해주세요.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" className="comment__submit">
            <HiCursorClick />
          </button>
        </>
      ) : (
        <textarea
          name="comment"
          className="comment__textarea"
          rows={1}
          placeholder="로그인 후 이용 가능합니다."
          value={content}
          disabled={true}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
    </form>
  )
}

export default CommentForm