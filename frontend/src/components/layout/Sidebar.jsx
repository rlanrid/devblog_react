import { HiOutlineHome, HiClock, HiChartBar } from "react-icons/hi";
import logoImg from "../../assets/icons/logo.png";

const Sidebar = ({ isMenuOpen }) => {
  return (
    <aside className={`sidebar ${isMenuOpen ? "is-open" : ""}`}>
      <header className="sidebar__header">
        <h1 className="sidebar__logo">
          <div className="sidebar__logo-box">
            D
          </div>
          <span>DevBlog</span>
        </h1>
      </header>

      <div className="sidebar__inner">
        <nav className="nav" aria-label="주 메뉴">
          <ul className="sidebar__menu">
            <li className="sidebar__menu-item">
              <a href="/" className="sidebar__active">
                <HiOutlineHome />
                <span>홈</span>
              </a>
            </li>
            <li className="sidebar__menu-item">
              <a href="/">
                <HiClock />
                <span>활동</span>
              </a>
            </li>
            <li className="sidebar__menu-item">
              <a href="/">
                <HiChartBar />
                <span>통계</span>
              </a>
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