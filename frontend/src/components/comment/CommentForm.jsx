import { HiCursorClick } from "react-icons/hi";

const CommentForm = ({ handleSubmit, content, setContent, user }) => {

  return (
    <form onSubmit={handleSubmit} className="comment__form">
      <div className="comment__profile">
        <img src={user.profileImage} alt="유저 프로필" />
      </div>

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
    </form>
  )
}

export default CommentForm