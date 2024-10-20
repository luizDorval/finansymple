import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const RequireAuth = ({ allowedRoles }) => {
  RequireAuth.propTypes = {
    allowedRoles: PropTypes.array,
  };
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="-1" state={{ from: location }} replace />
  ) : (
    <Navigate to="sign_in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
