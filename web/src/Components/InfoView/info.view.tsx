import React, { FC } from 'react';
import './profile.icon.scss';
import { Buffer } from 'buffer';
import { Table } from 'antd';

export interface InfoViewProps {
  data: any;
  title: any;
  icon: any;
}


const InfoView: FC<InfoViewProps> = (props: InfoViewProps) => {
  const { title, data, icon } = props;

  return (
    <div>
      <div>{title}</div>
      <div>
      </div>
    </div>
  );
};
export default InfoView;
