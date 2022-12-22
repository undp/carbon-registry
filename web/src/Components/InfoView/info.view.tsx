import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './info.view.scss';

export interface InfoViewProps {
  data: any;
  title: any;
  icon: any;
}

const InfoView: FC<InfoViewProps> = (props: InfoViewProps) => {
  const { title, data, icon } = props;

  return (
    <div>
      <div>
        <span>{icon}</span>
        {title}
      </div>
      <div>
        {Object.keys(data).map((k: any) => {
          return (
            <Row>
              <Col span={10}>{k}</Col>
              <Col span={14}>{data[k]}</Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
};
export default InfoView;
