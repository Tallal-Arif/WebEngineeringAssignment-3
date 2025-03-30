import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
