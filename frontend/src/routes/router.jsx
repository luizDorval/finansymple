import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../pages/Layout';
import Missing from '../pages/Missing';
import RequireAuth from '../components/RequireAuth';
import PersistLogin from '../components/PersistLogin';
import CentralizationContainer from '../components/CentralizationContainer';
const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<CentralizationContainer />}>
            <Route path="/sign_in" element={<Login />} />
            <Route path="/sign_up" element={<Register />} />
          </Route>

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={['usr']} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
