import { HiOutlineHome, HiClock, HiChartBar, HiCog, HiOutlineSun, HiOutlineMoon, HiOutlinePencilAlt, HiOutlineLogout } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ isMenuOpen }) => {
  const { theme, changeTheme } = useTheme();
  const { handleLogout, isLoggedIn } = useAuth();

  const params = useParams();

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
            {isLoggedIn() &&
              <li className="sidebar__menu-item">
                <button onClick={handleLogout} className="logout-btn">
                  <HiOutlineLogout />
                  <span>로그아웃</span>
                </button>
              </li>
            }
            <li className="sidebar__theme">
              <button
                className={`theme-toggle-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => changeTheme("light")}
                aria-label="라이트모드"
              >
                <HiOutlineSun />
                <span>라이트</span>
              </button>

              <button
                className={`theme-toggle-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => changeTheme("dark")}
                aria-label="다크모드"
              >
                <HiOutlineMoon />
                <span>다크</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar