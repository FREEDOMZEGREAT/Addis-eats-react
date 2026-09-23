import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAdminAuth } from './useAdminAuth';

function RequireAdmin({ children }) {
  const isAuthenticated = useAdminAuth(state => state.isAuthenticated);
  const location = useLocation();
  
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }
  
  return children;
}

RequireAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAdmin;