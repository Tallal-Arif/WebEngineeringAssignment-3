import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const TutorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h2>Welcome, {user.name}</h2>
      <div className="dashboard-links">
        <Link to="/tutor/sessions">📆 My Sessions</Link>
        <Link to="/tutor/profile">👤 Edit Profile</Link>
      </div>
    </div>
  );
};

export default TutorDashboard;
