import React, { FC } from 'react';
import { Skeleton, Tooltip } from 'antd';
import { InfoCircle } from 'react-bootstrap-icons';

export interface BarChartStatsProps {
  id: string;
  title: string;
  options: any;
  series: any;
  lastUpdate: any;
  loading: boolean;
  toolTipText: string;
  Chart: any;
  width: any;
}

export const BarChartsStatComponent: FC<BarChartStatsProps> = (props: BarChartStatsProps) => {
  const { id, title, options, series, lastUpdate, loading, toolTipText, Chart, width } = props;
  return (
    <div className="statics-card height-bar-rem">
      <div className="charts-top">
        <div className="charts-title">{title}</div>
        <div className="info-container">
          <Tooltip arrowPointAtCenter placement="bottomRight" trigger="hover" title={toolTipText}>
            <InfoCircle color="#000000" size={17} />
          </Tooltip>
        </div>
      </div>
      {loading ? (
        <div className="margin-top-2">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <>
          <div className="charts-section">
            <Chart
              id={id}
              options={options}
              series={series}
              type="bar"
              height="350px"
              width={width}
            />
          </div>
          <div className="updated-on">
            {lastUpdate !== '0' && <div className="updated-moment-container">{lastUpdate}</div>}
          </div>
        </>
      )}
    </div>
  );
};
