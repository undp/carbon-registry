import React, { FC } from 'react';
import moment from 'moment';
import './mapCard.scss';

export interface MapCardProps {
  title: string;
}

const MapCard: FC<MapCardProps> = (props: MapCardProps, { children }) => {
  const { title } = props;

  return (
    <div className="map-card">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};
export default MapCard;
