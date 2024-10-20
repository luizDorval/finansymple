import PropTypes from 'prop-types';
import './styles.css';
import { Outlet } from 'react-router-dom';

const CentralizationContainer = () => {
  return (
    <div className="centralization-container">
      <Outlet />
    </div>
  );
};

export default CentralizationContainer;
