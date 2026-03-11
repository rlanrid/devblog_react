import { HiOutlineHome, HiClock, HiChartBar, HiCog, HiOutlineSun, HiOutlineMoon, HiOutlinePencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isMenuOpen }) => {
  // Theme
  const { theme, changeTheme } = useTheme();

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    changeTheme(nextTheme);
  };


  return (
    <aside className={`sidebar ${isMenuOpen ? "is-open" : ""}`}>
      <header className="sidebar__header">
        <Link to="/" className="sidebar__logo">
          <div className="sidebar__logo-box">
            D
          </div>
          <h1>DevBlog</h1>
        </Link>
      </header>

      <div className="sidebar__inner">
        <nav className="sidebar__nav" aria-label="주 메뉴">
          <ul className="sidebar__menu">
            <li className="sidebar__menu-item">
              <Link to="/" className="sidebar__active">
                <HiOutlineHome />
                <span>홈</span>
              </Link>
            </li>
            <li className="sidebar__menu-item">
              <Link to="/posts/create">
                <HiOutlinePencilAlt />
                <span>작성</span>
              </Link>
            </li>
            <li className="sidebar__menu-item">
              <Link to="/">
                <HiClock />
                <span>활동</span>
              </Link>
            </li>
            <li className="sidebar__menu-item">
              <Link to="/">
                <HiChartBar />
                <span>통계</span>
              </Link>
            </li>
          </ul>

          <ul className="sidebar__menu">
            <li className="sidebar__menu-item">
              <Link to="/" >
                <HiCog />
                <span>설정</span>
              </Link>
            </li>
            <li className="sidebar__theme">
              <button className="theme-toggle-btn active">
                <HiOutlineSun />
                <span>라이트</span>
              </button>
              <button className="theme-toggle-btn">
                <HiOutlineMoon />
                <span>다크</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* <section className="sidebar__tags" aria-labelledby="sidebar__tags-head">
          <h2 id="sidebar__tags-head" className="sr-only">태그 목록</h2>
          <ul className="sidebar__tag-list">
            {tempTags.map((tag) => (
              <li key={tag} className="sidebar__tag-item">
                <button data-tag={tag} onClick={() => {
                  updateQuery("tag", tag);
                }}>
                  #{tag}
                </button>
              </li>
            ))}
          </ul>
        </section> */}
      </div>
    </aside>
  )
}

export default Sidebar