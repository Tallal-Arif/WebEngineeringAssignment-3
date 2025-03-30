import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <strong>EduConnect</strong> &nbsp;&nbsp;

      {user.role === 'student' && (
        <>
          <Link to="/student/profile">My Profile</Link> &nbsp;
          <Link to="/student/dashboard">Dashboard</Link> &nbsp;
          <Link to="/student/tutors">Browse Tutors</Link> &nbsp;
          <Link to="/student/sessions">My Sessions</Link> &nbsp;
          <Link to="/student/wishlist">Wishlist</Link> &nbsp;
        </>
      )}

      {user.role === 'tutor' && (
        <>
          <Link to="/tutor/dashboard">Dashboard</Link> &nbsp;
          <Link to="/tutor/sessions">My Sessions</Link> &nbsp;
          <Link to="/tutor/profile">Profile</Link> &nbsp;
        </>
      )}

      {user.role === 'admin' && (
        <>
          <Link to="/admin/dashboard">Admin Panel</Link> &nbsp;
        </>
      )}

      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
    </nav>
  );
};

export default Navbar;
