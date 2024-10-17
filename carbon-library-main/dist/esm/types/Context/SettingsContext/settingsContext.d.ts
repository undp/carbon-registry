import React from 'react';
export declare const SettingsContext: React.Context<{
    isTransferFrozen: boolean;
    setTransferFrozen: (value: boolean) => void;
}>;
export declare const SettingsContextProvider: ({ children }: React.PropsWithChildren) => React.JSX.Element;
export declare const useSettingsContext: () => {
    isTransferFrozen: boolean;
    setTransferFrozen: (value: boolean) => void;
};
