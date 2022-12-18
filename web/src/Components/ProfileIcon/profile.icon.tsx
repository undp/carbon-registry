import Icon from '@ant-design/icons';
import React, { FC } from 'react';
import './profile.icon.scss';

export interface ProfileIconProps {
  icon: any;
  bg: string;
  name: string;
}

const ProfileIcon: FC<ProfileIconProps> = (props: ProfileIconProps) => {
  const { icon, bg, name } = props;

  return (
    <span className="profile-icon" style={{ backgroundColor: bg }}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
};
export default ProfileIcon;
