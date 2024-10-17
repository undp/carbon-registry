import { FC } from 'react';
import './profile.icon.scss';
export interface ProfileIconProps {
    icon: any;
    bg: string;
    name: string;
}
export declare const isBase64: (str: string) => boolean;
export declare const ProfileIcon: FC<ProfileIconProps>;
