import React, { useContext, useState, createContext, useCallback } from 'react';
import {
  UserContextProps,
  UserProps,
} from '../../Definitions/InterfacesAndType/userInformationContext.definitions';
import { useConnection } from '../ConnectionContext/connectionContext';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext<UserContextProps>({
  setUserInfo: () => {},
  removeUserInfo: () => {},
  setFullName: () => {},
  getFullName: () => '',
  IsAuthenticated: () => false,
});

export const UserInformationContextProvider = ({ children }: React.PropsWithChildren) => {
  const { token } = useConnection();
  const initialUserProps: UserProps = {
    email: '',
    id: '',
    fullName: '',
    userRole: '',
  };
  const [userInfo, setUserInfoState] = useState<UserProps>(initialUserProps);

  const setUserInfo = (value: UserProps) => {
    setUserInfoState(value);
    const { email, id, fullName, userRole } = value;
    if (fullName) {
      setUserInfoState((prev) => ({ ...prev, fullName }));
    }

    if (email) {
      setUserInfoState((prev) => ({ ...prev, email }));
    }

    if (id) {
      setUserInfoState((prev) => ({ ...prev, id }));
      localStorage.setItem('userId', id);
    }

    if (userRole) {
      setUserInfoState((prev) => ({ ...prev, userRole }));
      localStorage.setItem('userRole', userRole);
    }
  };

  const IsAuthenticated = useCallback((): boolean => {
    let tokenVal: string | null;
    if (token) {
      tokenVal = token;
    } else {
      tokenVal = localStorage.getItem('token');
    }
    try {
      if (tokenVal) {
        const { exp } = jwt_decode(tokenVal) as any;
        return Date.now() < exp * 1000;
      }
      return false;
    } catch (err) {
      return false;
    }
  }, [token]);

  const removeUserInfo = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUserInfoState(initialUserProps);
  };

  const setFullName = (fullName: string) => {
    setUserInfoState((prev) => ({ ...prev, fullName }));
  };

  const getFullName = (): string => {
    return userInfo.fullName;
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        removeUserInfo,
        setFullName,
        getFullName,
        IsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUserContext = (): UserContextProps => {
  return useContext(UserContext);
};
