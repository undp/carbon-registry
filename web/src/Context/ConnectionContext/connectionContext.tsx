import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConnectionProps } from '../../Definitions/Interfaces/connectionContext.interfaces';
import {
  ConnectionContextProviderProps,
  Methods,
} from '../../Definitions/Types/connectionContext.types';

const ConnectionContext = createContext<{
  connection?: ConnectionProps;
}>({});

export const ConnectionContextProvider: FC<ConnectionContextProviderProps> = (
  props: ConnectionContextProviderProps
) => {
  const [token, setToken] = useState<string>();
  const { serverURL, children } = props;

  useEffect(() => {
    const timer = setInterval(async () => {
      const newToken: any = await localStorage.getItem('token');
      if (token !== newToken) {
        setToken(newToken);
      }
    }, 3000);
    if (token) {
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [token]);

  const send = useCallback(
    (method: Methods, path: string, data?: any, config?: AxiosRequestConfig) => {
      return new Promise((resolve, reject) => {
        const url = `${serverURL}/${path}`;
        let headers: any;
        if (token) {
          headers = { authorization: `Bearer ${token.toString()}` };
        } else {
          localStorage.getItem('token');
          headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          };
        }
        axios({
          method,
          url,
          data,
          headers,
          ...config,
        })
          .then((response: AxiosResponse) => {
            if (response.status) {
              if (response.status === 200) {
                resolve({
                  status: response.status,
                  data: response.data.data ?? response.data,
                  statusText: 'SUCCESS',
                  message: response.data.message,
                });
              } else if (response.status === 201) {
                resolve({
                  status: response.status,
                  data: response.data.message,
                  statusText: 'CREATED',
                  message: response.data.message,
                });
              } else if (response.status === 422) {
                reject({
                  status: response.status,
                  data: response.data?.data,
                  statusText: 'ERROR',
                  message: response.data.message,
                  errors: response.data?.errors,
                });
              }
            } else {
              reject({
                status: 500,
                statusText: 'UNKNOWN',
                message: 'Something went wrong',
              });
            }
          })
          .catch((e: any) => {
            if (e.response) {
              if (e.response.status) {
                if (e.response.data.message === 'jwt expired') {
                  localStorage.removeItem('token');
                  window.location.reload();
                }

                reject({
                  status: e.response.status,
                  statusText: 'ERROR',
                  errors: e.response.data?.errors,
                  message: e.response.data.message,
                });
              } else {
                reject({
                  statusText: 'ERROR',
                  message: 'Something went wrong',
                });
              }
            } else {
              reject({
                statusText: 'ERROR',
                message: 'Network error',
              });
            }
          });
      }) as any;
    },
    [token, serverURL]
  );
  const post = useCallback(
    (path: string, data?: any, config?: AxiosRequestConfig) => {
      return send('post', path, data, config);
    },
    [send]
  );
  const put = useCallback(
    (path: string, data?: any, config?: AxiosRequestConfig) => {
      return send('put', path, data, config);
    },
    [send]
  );
  const get = useCallback(
    (path: string, config?: AxiosRequestConfig) => {
      return send('get', path, undefined, config);
    },
    [send]
  );
  const patch = useCallback(
    (path: string, data?: any, config?: AxiosRequestConfig) => {
      return send('patch', path, data, config);
    },
    [send]
  );
  const del = useCallback(
    (path: string, config?: AxiosRequestConfig) => {
      return send('delete', path, config);
    },
    [send]
  );

  const updateToken = useCallback(async (tokenx?: string) => {
    if (tokenx) {
      localStorage.setItem('token', tokenx);
      setToken(tokenx);
    } else {
      localStorage.removeItem('token');
      setToken(undefined);
    }
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        connection: { post, put, get, patch, delete: del, updateToken, token },
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionContext;

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  return context.connection!;
};
