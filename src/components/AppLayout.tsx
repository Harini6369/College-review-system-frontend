import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppLayout = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          Campus Reviews
        </Link>
        <nav className="site-nav">
          <NavLink to="/">Colleges</NavLink>
          {isAdmin && <NavLink to="/admin/colleges">Manage colleges</NavLink>}
          {isAdmin && <NavLink to="/admin/users">Users</NavLink>}
          {user ? (
            <>
              <NavLink to="/profile">{user.name}</NavLink>
              <button type="button" className="text-link" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/register" className="nav-cta">
                Join
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
