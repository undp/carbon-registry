import { Col, Row } from 'antd';
import React from 'react';
import Chart from 'react-apexcharts';
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

const options: any = {
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  chart: {
    type: 'bar',
    height: 400,
    stacked: true,
    stackType: 'normal',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  xaxis: {
    categories: [
      '2011 Q1',
      '2011 Q2',
      '2011 Q3',
      '2011 Q4',
      '2012 Q1',
      '2012 Q2',
      '2012 Q3',
      '2012 Q4',
    ],
  },
  fill: {
    opacity: 1,
  },
  title: {
    text: 'Total Projects',
    align: 'left',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Proxima-Nova-Regular',
      color: '#263238',
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 5,
    labels: {
      colors: undefined,
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};

const optionsX: any = {
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  chart: {
    type: 'bar',
    height: 400,
    stacked: true,
    stackType: 'normal',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  xaxis: {
    categories: [
      '2011 Q1',
      '2011 Q2',
      '2011 Q3',
      '2011 Q4',
      '2012 Q1',
      '2012 Q2',
      '2012 Q3',
      '2012 Q4',
    ],
  },
  fill: {
    opacity: 1,
    colors: ['#414487', '#22A884', '#FDE725'],
  },
  title: {
    text: 'Total Projects, Sector wised',
    align: 'left',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Proxima-Nova-Regular',
      color: '#263238',
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 5,
    labels: {
      colors: ['#414487', '#22A884', '#FDE725'],
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};

const series = [
  {
    name: 'Approved',
    data: [44, 55, 41, 67, 22, 43, 21, 49],
  },
  {
    name: 'Rejected',
    data: [13, 23, 20, 8, 13, 27, 33, 12],
  },
  {
    name: 'Pending',
    data: [11, 17, 15, 15, 21, 14, 15, 13],
  },
];

const optionsY: any = {
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  chart: {
    type: 'bar',
    height: 400,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  xaxis: {
    categories: [
      '2011 Q1',
      '2011 Q2',
      '2011 Q3',
      '2011 Q4',
      '2012 Q1',
      '2012 Q2',
      '2012 Q3',
      '2012 Q4',
    ],
  },
  fill: {
    opacity: 1,
    colors: ['#414487', '#22A884', '#FDE725'],
  },
  title: {
    text: 'Total Projects, Sector wised',
    align: 'left',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Proxima-Nova-Regular',
      color: '#263238',
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 5,
    labels: {
      colors: ['#414487', '#22A884', '#FDE725'],
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};

const seriesY = [
  {
    name: 'Approved',
    data: [44, 55, 41, 67, 22, 43, 21, 49],
  },
  {
    name: 'Rejected',
    data: [13, 23, 20, 8, 13, 27, 33, 12],
  },
  {
    name: 'Pending',
    data: [11, 17, 15, 15, 21, 14, 15, 13],
  },
];

const optionsP: any = {
  chart: {
    type: 'pie',
    height: 400,
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const seriesP = [44, 55, 13, 43, 22];

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
      <div className="stastics-charts-container">
        <Row gutter={[16, 30]} className="stastic-charts-row">
          <Col xxl={12} xl={12} md={12} className="stastic-charts-col">
            <div className="chart-card">
              <Chart options={options} series={series} type="bar" height="350px" width="450px" />
            </div>
          </Col>
          <Col xxl={12} xl={12} md={12} className="stastic-charts-col">
            <div className="chart-card">
              <Chart options={optionsX} series={series} type="bar" height="350px" width="450px" />
            </div>
          </Col>
          <Col xxl={12} xl={12} md={12} className="stastic-charts-col">
            <div className="chart-card">
              <Chart options={optionsY} series={seriesY} type="bar" height="350px" width="450px" />
            </div>
          </Col>
          <Col xxl={12} xl={12} md={12} className="stastic-charts-col">
            <div className="chart-card">
              <Chart options={optionsP} series={seriesP} type="pie" height="350px" width="450px" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="maps-container"></div>
    </div>
  );
};

export default Dashboard;
