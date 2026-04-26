/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
