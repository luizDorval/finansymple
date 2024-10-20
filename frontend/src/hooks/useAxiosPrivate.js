import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { finansympleApi } from '../apis/finansymple';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = finansympleApi.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = finansympleApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return finansympleApi(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      finansympleApi.interceptors.request.eject(requestIntercept);
      finansympleApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return finansympleApi;
};

export default useAxiosPrivate;
