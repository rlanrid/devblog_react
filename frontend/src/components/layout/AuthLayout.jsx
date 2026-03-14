import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="auth__wrap">
      <header className="auth__header">
        {/* <h1>
          <Link to={'/'}>DevBlog</Link>
        </h1> */}
        <Link to="/" className="sidebar__logo">
          <div className="sidebar__logo-box">
            D
          </div>
          <h1>DevBlog</h1>
        </Link>
      </header>

      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout