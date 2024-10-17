import React, { FC, useState } from 'react';
import { Skeleton, Tooltip, Button } from 'antd';
import { InfoCircle } from 'react-bootstrap-icons';

export interface BarChartEstimatedActualStatsProps {
  id: string;
  title: string;
  estimateOptions: any;
  actualOptions: any;
  estimatedSeries: any;
  actualSeries: any;
  lastUpdateEstimate: any;
  lastUpdateActual: any;
  loading: boolean;
  toolTipText: string;
  Chart: any;
  width: any;
}

export const BarChartEstimatedActualStatComponent: FC<BarChartEstimatedActualStatsProps> = (
  props: BarChartEstimatedActualStatsProps
) => {
  const {
    id,
    title,
    estimateOptions,
    actualOptions,
    estimatedSeries,
    actualSeries,
    lastUpdateEstimate,
    lastUpdateActual,
    loading,
    toolTipText,
    Chart,
    width,
  } = props;

  const [showEstimate, setShowEstimate] = useState(false);
  const [showActuals, setShowActuals] = useState(true);

  const handleEstimatesClick = () => {
    setShowEstimate(true);
    setShowActuals(false);
  };

  const handleActualsClick = () => {
    setShowEstimate(false);
    setShowActuals(true);
  };

  return (
    <div className="statics-card height-bar-rem">
      <div className="charts-top">
        <div className="charts-title">{title}</div>
        <div className="info-container">
          <div className="actual-estimate-btn-grp">
            <Button.Group>
              <Button
                className="actual-btn"
                type={showActuals ? 'primary' : 'default'}
                onClick={handleActualsClick}
              >
                Actual
              </Button>
              <Button
                className="estimate-btn"
                type={showEstimate ? 'primary' : 'default'}
                onClick={handleEstimatesClick}
              >
                Estimates
              </Button>
            </Button.Group>
          </div>
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
          {(showActuals && actualSeries) && (
            <>
              <div className="charts-section">
                <Chart
                  id={id}
                  options={actualOptions}
                  series={actualSeries}
                  type="bar"
                  height="350px"
                  width={width}
                />
              </div>
              <div className="updated-on">
                {lastUpdateActual !== '0' && (
                  <div className="updated-moment-container">{lastUpdateActual}</div>
                )}
              </div>
            </>
          )}
          {(showEstimate && estimatedSeries) && (
            <>
              <div className="charts-section">
                <Chart
                  id={id}
                  options={estimateOptions}
                  series={estimatedSeries}
                  type="bar"
                  height="350px"
                  width={width}
                />
              </div>
              <div className="updated-on">
                {lastUpdateEstimate !== '0' && (
                  <div className="updated-moment-container">{lastUpdateEstimate}</div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
