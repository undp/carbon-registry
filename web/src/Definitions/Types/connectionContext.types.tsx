import { ReactNode } from 'react';

export type Methods = 'get' | 'post' | 'delete' | 'put' | 'patch';

export type ConnectionContextProviderProps = {
  serverURL: string;
  children: ReactNode;
};
