import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h2>Welcome, {user.name}</h2>
      <div className="dashboard-links">
        <Link to="/student/tutors">🔍 Browse Tutors</Link>
        <Link to="/student/sessions">📆 My Sessions</Link>
        <Link to="/student/wishlist">💖 My Wishlist</Link>
        <Link to="/student/profile">👤 My Profile</Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
