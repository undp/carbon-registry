import React from 'react';
import { UserContextProps } from '../../Definitions';
export declare const UserContext: React.Context<UserContextProps>;
export declare const UserInformationContextProvider: ({ children }: React.PropsWithChildren) => React.JSX.Element;
export default UserContext;
export declare const useUserContext: () => UserContextProps;
