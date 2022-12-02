import React, { FC } from 'react';
import moment from 'moment';
import './mapCard.scss';

export interface MapCardProps {
  title: string;
  children: any;
}

const MapCard: FC<MapCardProps> = (props: MapCardProps) => {
  const { title, children } = props;

  return (
    <div className="map-card">
      <div className="title">{title}</div>
      <div className="map-container">{children}</div>
    </div>
  );
};
export default MapCard;
