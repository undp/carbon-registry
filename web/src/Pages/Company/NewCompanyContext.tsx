import { ConsoleSqlOutlined } from '@ant-design/icons';
import React, { FC, ReactNode, useContext, useState, useEffect, createContext } from 'react';

import { message } from 'antd';

export type AddCompanyContextProps = {
  stepOneData: any;
  setStepOneData: (val: any) => void;
};

export const NotificationContext = createContext<AddCompanyContextProps>({
  stepOneData: 0,
  setStepOneData: (val: any) => {},
});

export type ChildrenProp = { children: ReactNode };

export const AddCompanyContextProvider: FC<ChildrenProp> = ({ children }) => {
  const [stepOneData, setStepOneData] = useState<any>();

  return (
    <NotificationContext.Provider
      value={{
        stepOneData,
        setStepOneData,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): AddCompanyContextProps => {
  return useContext(NotificationContext);
};
