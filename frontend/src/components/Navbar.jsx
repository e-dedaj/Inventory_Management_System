import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth() || {};

  // 1. Lexojmë objektin 'user' nga localStorage
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  // 2. Marrim rolin nga useAuth, nga localStorage 'role', ose nga objekti 'user.role'
  const role = user?.role || savedUser?.role || localStorage.getItem('role') || 'guest';
  const username = user?.username || savedUser?.username || (role === 'admin' ? 'Admin' : 'Staf');
  
  const isAdmin = role.toLowerCase() === 'admin';

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">📦 Inventory </h2>

        <ul className="nav-links">
          <li className="nav-item">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink 
              to="/products" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Products
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink 
              to="/suppliers" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Suppliers
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink 
              to="/customers" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Customers
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <div>
          <div className="user-name">User</div>
          <div className="user-role">{username.toUpperCase()}</div>
        </div>

        <button onClick={handleLogout} className="btn-logout-link">
          Logout
        </button>
      </div>
    </aside>
  );
}