import { useAuth } from '../../context/AuthContext.jsx';

const StudentProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default StudentProfile;
