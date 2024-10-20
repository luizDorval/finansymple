import { Outlet } from 'react-router-dom';
import './styles.css';

const Layout = () => {
  return (
    <section className="layout">
      <Outlet />
    </section>
  );
};

export default Layout;
