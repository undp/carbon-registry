import React, { FC } from 'react';
import { ConnectionContextProviderProps, ConnectionProps } from '../../Definitions';
declare const ConnectionContext: React.Context<{
    connection?: ConnectionProps | undefined;
}>;
export declare const ConnectionContextProvider: FC<ConnectionContextProviderProps>;
export default ConnectionContext;
export declare const useConnection: () => ConnectionProps;
