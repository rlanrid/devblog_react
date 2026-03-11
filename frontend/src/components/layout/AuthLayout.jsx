import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="auth__wrap">
      <header className="auth__header">
        <Link to={'/'}>DevBlog</Link>
      </header>

      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout