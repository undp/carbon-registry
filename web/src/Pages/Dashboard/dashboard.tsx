import { Col, Row } from 'antd';
import React from 'react';
import StasticCard from '../../Components/StasticCard/StasticCard';
import './dashboard.scss';

const DUmData = [
  {
    value: 220,
    title: 'Projects Registered',
    updatedDate: 1669788334,
    level: '1',
  },
  {
    value: 220,
    title: 'Projects Authorized',
    updatedDate: 1669781334,
    level: '2',
  },
  {
    value: 80,
    title: 'Projects Rejected',
    updatedDate: 1669788334,
    level: '3',
  },
  {
    value: 72,
    title: 'Projects Certified',
    updatedDate: 1669788334,
    level: '4',
  },
  {
    value: 25,
    title: 'Certified Credits Available',
    updatedDate: 1669763334,
    level: '5',
  },
  {
    value: 200,
    title: 'Certified Credits Transferred',
    updatedDate: 1669783334,
    level: '6',
  },
  {
    value: 22,
    title: 'Certified Credits Available',
    updatedDate: 1669783334,
    level: '7',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="header-and-title">Overall</div>
      <div className="stastics-cards-container">
        <Row gutter={[16, 40]} className="stastic-card-row">
          {DUmData?.map((cardItem: any, index: number) => {
            return (
              <Col xxl={6} xl={6} md={12} className="stastic-card-col">
                <StasticCard
                  value={cardItem?.value}
                  title={cardItem?.title}
                  updatedDate={cardItem?.updatedDate}
                  level={cardItem?.level}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="stastics-charts-container"></div>
      <div className="maps-container"></div>
    </div>
  );
};

export default Dashboard;
