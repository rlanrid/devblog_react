import { tempTags } from "../../utils/constants";

import profileImg from "../../assets/images/profile.jpg";
import XImg from "../../assets/images/X.jpg";


const Sidebar = ({ updateQuery, isMenuOpen }) => {
  return (
    <aside className={`sidebar ${isMenuOpen ? "is-open" : ""}`}>
      <div className="sidebar__inner">
        <header className="sidebar__header">
          <h1 className="sidebar__logo">WJ's blog</h1>
          <div className="sidebar__profile">
            <img src={profileImg} alt="프로필 이미지" className="profile" />
          </div>
          <p className="sidebar__bio">Hi, my name is Mike. </p>
          <ul className="social">
            <li className="social__item Github">
              <a href="">
                <img src={XImg} alt="X" className="social__img" />
              </a>
            </li>
            <li className="social__item Jobkorea">
              <a href="">
                <img src={XImg} alt="X" className="social__img" />
              </a>
            </li>
            <li className="social__item Saramin">
              <a href="">
                <img src={XImg} alt="X" className="social__img" />
              </a>
            </li>
            <li className="social__item X">
              <a href="">
                <img src={XImg} alt="X" className="social__img" />
              </a>
            </li>
            <li className="social__item X">
              <a href="">
                <img src={XImg} alt="X" className="social__img" />
              </a>
            </li>
          </ul>
        </header>

        <nav className="nav" aria-label="주 메뉴">
          <ul className="menu">
            <li className="menu__item"><a href="/">Home</a></li>
            <li className="menu__item"><a href="/">My Posts</a></li>
            <li className="menu__item"><a href="/">Setting</a></li>
          </ul>
        </nav>

        {/* todo: post write */}

        <section className="sidebar__tags" aria-labelledby="sidebar__tags-head">
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
        </section>
      </div>
    </aside>
  )
}

export default Sidebar