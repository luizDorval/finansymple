import useAuth from './useAuth.js';
import { refresh } from '../apis/finansymple.js';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const useRefresh = async () => {
    const response = await refresh();

    setAuth((prev) => {
      return {
        ...prev,
        id: response.data.id,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };
  return useRefresh;
};

export default useRefreshToken;
