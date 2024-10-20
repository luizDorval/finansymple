import { logout } from '../apis/finansymple';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const signOut = async () => {
    setAuth({});
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return signOut;
};

export default useLogout;
