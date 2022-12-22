import { useState, useEffect } from 'react';
import { Row, Col, Card, Progress, Tag } from 'antd';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './programmeView.scss';
import { isBase64 } from '../../Components/ProfileIcon/profile.icon';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import InfoView from '../../Components/InfoView/info.view';
import { BuildOutlined, BulbOutlined } from '@ant-design/icons';
import {
  getFinancialFields,
  getGeneralFields,
  getStageEnumVal,
  getStageTagType,
  Programme,
  ProgrammeStage,
} from '../../Definitions/InterfacesAndType/programme.definitions';
import i18next from 'i18next';

const ProgrammeView = () => {
  const { put } = useConnection();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<Programme>();
  const { i18n, t } = useTranslation(['view']);

  useEffect(() => {
    console.log(state);
    if (!state) {
      console.log(state);
      navigate('/programmeManagement', { replace: true });
    }
    {
      setData(state.record);
    }
  }, []);

  if (!data) {
    return <div></div>;
  }
  const percentages: any[] = [];
  data.companyId.forEach((obj: any, index: number) => {
    percentages.push({
      company: obj,
      percentage: data.proponentPercentage ? data.proponentPercentage[index] : 100,
    });
  });
  percentages.sort((a: any, b: any) => b.percentage - a.percentage);

  const elements = percentages.map((ele: any) => {
    return (
      <div className="company-info">
        {isBase64(ele.company.logo) ? (
          <img src={'data:image/jpeg;base64,' + ele.company.logo} />
        ) : ele.company.name ? (
          <div className="programme-logo">{ele.company.name.charAt(0).toUpperCase()}</div>
        ) : (
          <div className="programme-logo">{'A'}</div>
        )}
        <div className="text-center programme-name">{ele.company.name}</div>
        <div className="progress-bar">
          <div>
            <div className="float-left">{t('view:ownership')}</div>
            <div className="float-right">{ele.percentage}%</div>
          </div>
          <Progress percent={ele.percentage} strokeWidth={7} status="active" showInfo={false} />
        </div>
      </div>
    );
  });

  const generalInfo: any = {};
  Object.entries(getGeneralFields(data)).forEach(([k, v]) => {
    const text = t('view:' + k);
    if (k === 'currentStatus') {
      generalInfo[text] = (
        <Tag className="clickable" color={getStageTagType(v as ProgrammeStage)}>
          {getStageEnumVal(v as string)}
        </Tag>
      );
    } else {
      generalInfo[text] = v;
    }
  });

  const finInfo: any = {};
  Object.entries(getFinancialFields(data)).forEach(([k, v]) => {
    const text = t('view:' + k);
    finInfo[text] = v;
  });

  return (
    <div className="content-container programme-view">
      <div className="title-bar">
        <div className="body-title">{t('view:details')}</div>
        <div className="body-sub-title">{t('view:desc')}</div>
      </div>
      <div className="content-body">
        <Row gutter={16}>
          <Col md={24} lg={9}>
            <Card className="card-container centered-card">{elements}</Card>
            <Card className="card-container">
              <Chart
                options={{
                  labels: ['Issued', 'Transferred', 'Balance', 'Frozen', 'Retired'],
                  legend: {
                    position: 'bottom',
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            showAlways: true,
                            show: true,
                            label: 'Total',
                            formatter: () => '' + data.creditIssued,
                          },
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: '15vw',
                        },
                        legend: {
                          position: 'bottom',
                        },
                      },
                    },
                  ],
                }}
                series={[
                  Number(data.creditIssued),
                  Number(data.creditTransferred),
                  Number(data.creditBalance),
                  0,
                  0,
                ]}
                type="donut"
                width="100%"
              />
            </Card>
            <Card className="card-container">
              <div>
                <InfoView data={finInfo} title={t('view:financial')} icon={<BuildOutlined />} />
              </div>
            </Card>
          </Col>
          <Col md={24} lg={15}>
            <Card className="card-container">
              <div>
                <InfoView data={generalInfo} title={t('view:general')} icon={<BulbOutlined />} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProgrammeView;
