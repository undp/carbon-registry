import React, { FC } from 'react';
import moment from 'moment';
import './stasticCard.scss';

export interface StasticCardItemProps {
  value: number;
  title: string;
  updatedDate: any;
  level: string;
}

const StasticCard: FC<StasticCardItemProps> = (props: StasticCardItemProps) => {
  const { value, title, updatedDate, level } = props;

  const cardBackgroundColor = (type: string) => {
    switch (type) {
      case '1':
        return '#023c66';
      case '2':
        return '#034b7f';
      case '3':
        return '#035998';
      case '4':
        return '#0468b1';
      case '5':
        return '#0577ca';
      case '6':
        return '#0585e3';
      default:
        return '#0894f9';
    }
  };

  return (
    <div className="stastic-card-main-container" style={{ background: cardBackgroundColor(level) }}>
      <div className="value-section">{value}</div>
      <div className="title-section">{title}</div>
      <div className="last-update-section">
        {moment.unix(updatedDate).format('DD:MM:YYYY, hh:mm:ss a')}
      </div>
    </div>
  );
};

export default StasticCard;
