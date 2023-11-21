import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Progress, Tag, Steps, message, Skeleton, Button, Modal, Form } from 'antd';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './programmeView.scss';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import * as Icon from 'react-bootstrap-icons';
import {
  BlockOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  ExperimentOutlined,
  SafetyOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { DateTime } from 'luxon';
import Geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import TextArea from 'antd/lib/input/TextArea';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { ShieldCheck } from 'react-bootstrap-icons';
import {
  CreditTransferStage,
  MapTypes,
  MarkerData,
  ProgrammeR,
  ProgrammeTransfer,
  addCommSep,
  mitigationTypeList,
  mitigationSubTypeList,
  sumArray,
  dateTimeFormat,
  isBase64,
  creditUnit,
  RetireType,
  TxType,
  getRetirementTypeString,
  TypeOfMitigation,
  SubTypeOfMitigation,
  UnitField,
  addSpaces,
  CompanyRole,
  CompanyState,
  Loading,
  OrganisationStatus,
  ProgrammeIssueForm,
  ProgrammeStageR,
  addCommSepRound,
  DevBGColor,
  DevColor,
  getStageEnumVal,
  getGeneralFields,
  getStageTagType,
  RoleIcon,
  InfoView,
  ProgrammeRevokeForm,
  ProgrammeRetireForm,
  ProgrammeTransferForm,
  MapComponent,
  getFinancialFields,
  TimelineBody,
  dateFormat,
  getValidNdcActions,
  addNdcDesc,
  Role,
} from '@undp/carbon-library';
import { useSettingsContext } from '../../Context/SettingsContext/settingsContext';

const ProgrammeView = () => {
  const { get, put, post } = useConnection();

  const { userInfoState } = useUserContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProgrammeR>();
  const [historyData, setHistoryData] = useState<any>([]);
  const { i18n, t } = useTranslation(['view']);
  const { t: companyProfileTranslations } = useTranslation(['companyProfile']);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [loadingAll, setLoadingAll] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [actionInfo, setActionInfo] = useState<any>({});
  const [comment, setComment] = useState<any>(undefined);
  const [certs, setCerts] = useState<any>([]);
  const [certTimes, setCertTimes] = useState<any>({});
  const [retireReason, setRetireReason] = useState<any>();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [centerPoint, setCenterPoint] = useState<number[]>([]);
  const mapType = process.env.REACT_APP_MAP_TYPE ? process.env.REACT_APP_MAP_TYPE : 'None';
  const [isAllOwnersDeactivated, setIsAllOwnersDeactivated] = useState(true);
  const { isTransferFrozen, setTransferFrozen } = useSettingsContext();
  const [ministrySectoralScope, setMinistrySectoralScope] = useState<any[]>([]);
  const accessToken =
    mapType === MapTypes.Mapbox && process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN
      ? process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN
      : '';
  const { id } = useParams();

  const showModal = () => {
    setOpenModal(true);
  };

  const ministryLevelPermission =
    data &&
    userInfoState?.companyRole === CompanyRole.MINISTRY &&
    ministrySectoralScope.includes(data.sectoralScope) &&
    userInfoState?.userRole !== 'ViewOnly';

  const locationColors = ['#6ACDFF', '#FF923D', '#CDCDCD', '#FF8183', '#B7A4FE'];

  const getFileName = (filepath: string) => {
    const index = filepath.indexOf('?');
    if (index > 0) {
      filepath = filepath.substring(0, index);
    }
    // const lastCharcter = filepath.charAt(filepath.length - 1);
    // if (lastCharcter === '/') {
    //   filepath = filepath.slice(0, -1);
    // }
    // return filepath.substring(filepath.lastIndexOf('/') + 1);
    return filepath.substring(filepath.lastIndexOf('%2F') + 3);
  };

  const fileItemContent = (filePath: any) => {
    let DocumentName: any;
    console.log(filePath.length, '...........');
    if (filePath.includes('DESIGN')) {
      DocumentName = 'Design Document';
    }
    if (filePath.includes('METHODOLOGY')) DocumentName = 'Methodology  Document';
    if (filePath.includes('OBJECTION')) DocumentName = 'No Objection Letter';
    if (filePath.includes('AUTHORISATION')) DocumentName = 'Letter of Authorisation';
    if (filePath.includes('ENVIRONMENTAL_IMPACT_ASSESSMENT'))
      DocumentName = 'Environmental Impact Assessment';
    if (filePath.includes('MONITORING_REPORT')) DocumentName = 'Monitoring Report';
    if (filePath.includes('VERIFICATION_REPORT')) DocumentName = 'Verification Report';
    const versionfull = filePath.split('_')[filePath.split('_').length - 1];
    const version = versionfull ? versionfull.split('.')[0] : 'V1';
    const finalversion = version.startsWith('V') ? version : 'V1';
    return (
      <Row className="field" key={filePath}>
        <Col span={12} className="field-key">
          <div>
            {DocumentName} ~ {finalversion}
          </div>
        </Col>
        <Col span={12} className="field-value">
          <a target="_blank" href={filePath} rel="noopener noreferrer" className="file-name">
            <BookOutlined />
          </a>
        </Col>
      </Row>
    );
  };

  const getFileContent = (files: any) => {
    if (Array.isArray(files)) {
      const design = files.filter((filePath) => filePath.includes('DESIGN')).sort();
      const methodolgy = files.filter((filePath) => filePath.includes('METHODOLOGY')).sort();
      const envimpact = files
        .filter((filePath) => filePath.includes('ENVIRONMENTAL_IMPACT_ASSESSMENT'))
        .sort();
      const monitor = files.filter((filePath) => filePath.includes('MONITORING_REPORT')).sort();
      const auth = files.filter((filePath) => filePath.includes('AUTHORISATION')).sort();
      const objec = files.filter((filePath) => filePath.includes('OBJECTION')).sort();
      const verification = files
        .filter((filePath) => filePath.includes('VERIFICATION_REPORT'))
        .sort();
      const latestfile = [];
      if (design.length > 0) latestfile.push(design.pop());
      if (objec.length > 0) latestfile.push(objec.pop());
      if (methodolgy.length > 0) latestfile.push(methodolgy.pop());
      if (auth.length > 0) latestfile.push(auth.pop());
      if (envimpact.length > 0) latestfile.push(envimpact.pop());
      if (monitor.length > 0) latestfile.push(monitor.pop());
      if (verification.length > 0) latestfile.push(verification.pop());
      return latestfile.map((filePath: any) => {
        return fileItemContent(filePath);
      });
    } else {
      return fileItemContent(files);
    }
  };

  const getTxRefValues = (value: string, position: number, sep?: string) => {
    if (sep === undefined) {
      sep = '#';
    }
    const parts = value.split(sep);
    if (parts.length - 1 < position) {
      return null;
    }
    return parts[position];
  };

  const numIsExist = (n: any) => {
    return n ? Number(n) : 0;
  };

  const getPieChartData = (d: ProgrammeR) => {
    const frozen = d.creditFrozen
      ? d.creditFrozen.reduce((a, b) => numIsExist(a) + numIsExist(b), 0)
      : 0;
    const dt = [
      numIsExist(d.creditEst) - numIsExist(d.creditIssued),
      numIsExist(d.creditIssued) -
        sumArray(d.creditTransferred) -
        sumArray(d.creditRetired) -
        frozen,
      sumArray(d.creditTransferred),
      sumArray(d.creditRetired),
      frozen,
    ];
    return dt;
  };

  const getCenter = (list: any[]) => {
    let count = 0;
    let lat = 0;
    let long = 0;
    for (const l of list) {
      if (l === null || l === 'null') {
        continue;
      }
      count += 1;
      lat += l[0];
      long += l[1];
    }
    return [lat / count, long / count];
  };

  const drawMap = () => {
    setTimeout(async () => {
      if (data?.geographicalLocationCordintes && data?.geographicalLocationCordintes.length > 0) {
        setCenterPoint(getCenter(data?.geographicalLocationCordintes));
        const markerList = [];
        for (const iloc in data?.geographicalLocationCordintes) {
          if (data?.geographicalLocationCordintes[iloc] !== null) {
            const markerData: MarkerData = {
              color: locationColors[(Number(iloc) + 1) % locationColors.length],
              location: data?.geographicalLocationCordintes[iloc],
            };

            markerList.push(markerData);
          }
        }

        setMarkers(markerList);
      } else {
        if (!accessToken || !data!.programmeProperties.geographicalLocation) return;
        const locMarkers: MarkerData[] = [];
        for (const address in data!.programmeProperties.geographicalLocation) {
          const response = await Geocoding({ accessToken: accessToken })
            .forwardGeocode({
              query: data!.programmeProperties.geographicalLocation[address],
              autocomplete: false,
              limit: 1,
              types: ['region', 'district'],
              countries: [process.env.REACT_APP_COUNTRY_CODE || 'NG'],
            })
            .send();

          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error('Invalid response:');
            console.error(response);
            return;
          }
          const feature = response.body.features[0];
          setCenterPoint(feature.center);

          const marker: MarkerData = {
            color: locationColors[(Number(address) + 1) % locationColors.length],
            location: feature.center,
          };
          locMarkers.push(marker);
        }
        setMarkers(locMarkers);
      }
    }, 1000);
  };

  const genPieData = (d: ProgrammeR) => {
    // ['Authorised', 'Issued', 'Transferred', 'Retired', 'Frozen']

    const dt = getPieChartData(d);
    ApexCharts.exec('creditChart', 'updateSeries', {
      series: dt,
    });
  };
  const genCerts = (d: any, certifiedTime: any) => {
    if (d === undefined) {
      return;
    }
    const c = d.certifier.map((cert: any) => {
      return (
        <div className="">
          <div className="cert-info">
            {isBase64(cert.logo) ? (
              <img alt="certifier logo" src={'data:image/jpeg;base64,' + cert.logo} />
            ) : cert.logo ? (
              <img alt="certifier logo" src={cert.logo} />
            ) : cert.name ? (
              <div className="cert-logo">{cert.name.charAt(0).toUpperCase()}</div>
            ) : (
              <div className="cert-logo">{'A'}</div>
            )}
            <div className="text-center cert-name">{cert.name}</div>
            {certifiedTime[cert.companyId] && (
              <div className="text-center cert-date">{certifiedTime[cert.companyId]}</div>
            )}
          </div>
        </div>
      );
    });
    setCerts(c);
  };

  const getProgrammeById = async (programmeId: string) => {
    try {
      const response: any = await post('national/programme/query', {
        page: 1,
        size: 2,
        filterAnd: [
          {
            key: 'programmeId',
            operation: '=',
            value: programmeId,
          },
        ],
      });
      if (response.data && response.data.length > 0) {
        const d = response.data[0];
        setData(d);
        navigate('.', { state: { record: d } });
      }
    } catch (error: any) {
      console.log('Error in getting programme', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
    }
    setLoadingAll(false);
  };

  const addElement = (e: any, time: number, hist: any) => {
    time = Number(time);
    if (!hist[time]) {
      hist[time] = [];
    }
    hist[time].push(e);
  };

  const formatString = (langTag: string, vargs: any[]) => {
    const str = t(langTag);
    const parts = str.split('{}');
    let insertAt = 1;
    for (const arg of vargs) {
      parts.splice(insertAt, 0, arg);
      insertAt += 2;
    }
    return parts.join('');
  };

  const getTxActivityLog = (transfers: ProgrammeTransfer[], txDetails: any) => {
    const hist: any = {};
    for (const transfer of transfers) {
      txDetails[transfer.requestId!] = transfer;
      const createdTime = Number(transfer.createdTime ? transfer.createdTime : transfer.txTime!);
      let d: any;
      if (!transfer.isRetirement) {
        d = {
          status: 'process',
          title: t('view:tlInitTitle'),
          subTitle: DateTime.fromMillis(createdTime).toFormat(dateTimeFormat),
          description: (
            <TimelineBody
              text={formatString('view:tlInitDesc', [
                addCommSep(transfer.creditAmount),
                creditUnit,
                transfer.sender[0]?.name,
                transfer.receiver[0]?.name,
                transfer.requester[0]?.name,
              ])}
              remark={transfer.comment}
              via={transfer.userName}
              t={t}
            />
          ),
          icon: (
            <span className="step-icon transfer-step">
              <Icon.ClockHistory />
            </span>
          ),
        };
      } else {
        d = {
          status: 'process',
          title: t('view:tlRetInit'),
          subTitle: DateTime.fromMillis(createdTime).toFormat(dateTimeFormat),
          description: (
            <TimelineBody
              text={formatString('view:tlRetInitDesc', [
                addCommSep(transfer.creditAmount),
                creditUnit,
                transfer.sender[0]?.name,
                `${
                  transfer.toCompanyMeta?.countryName
                    ? `to ${transfer.toCompanyMeta?.countryName} `
                    : ''
                }`,
                transfer.retirementType === RetireType.CROSS_BORDER
                  ? 'cross border transfer'
                  : transfer.retirementType === RetireType.LEGAL_ACTION
                  ? 'legal action'
                  : 'other',
                transfer.requester[0]?.name,
              ])}
              remark={transfer.comment}
              via={transfer.userName}
              t={t}
            />
          ),
          icon: (
            <span className="step-icon retire-step">
              <Icon.ClockHistory />
            </span>
          ),
        };
      }

      addElement(d, createdTime, hist);

      if (
        transfer.status === CreditTransferStage.Rejected ||
        transfer.status === CreditTransferStage.NotRecognised
      ) {
        const dx: any = {
          status: 'process',
          title: t(transfer.isRetirement ? 'view:tlRetRejectTitle' : 'view:tlRejectTitle'),
          subTitle: DateTime.fromMillis(Number(transfer.txTime!)).toFormat(dateTimeFormat),
          description: (
            <TimelineBody
              text={formatString(
                transfer.isRetirement ? 'view:tlTxRetRejectDesc' : 'view:tlTxRejectDesc',
                [
                  addCommSep(transfer.creditAmount),
                  creditUnit,
                  transfer.sender[0]?.name,
                  transfer.isRetirement && transfer.toCompanyMeta?.countryName
                    ? transfer.toCompanyMeta?.countryName
                    : transfer.receiver[0]?.name,
                  transfer.isRetirement ? transfer.receiver[0]?.name : transfer.sender[0]?.name,
                ]
              )}
              remark={transfer.txRef?.split('#')[0]}
              via={transfer.userName}
              t={t}
            />
          ),
          icon: (
            <span
              className={`step-icon ${transfer.isRetirement ? 'retire-step' : 'transfer-step'}`}
            >
              <Icon.XOctagon />
            </span>
          ),
        };
        addElement(dx, Number(transfer.txTime!), hist);
      } else if (transfer.status === CreditTransferStage.Cancelled) {
        const systemCancel = transfer.txRef && transfer.txRef.indexOf('#SUSPEND_AUTO_CANCEL#') >= 0;
        const lowCreditSystemCancel =
          transfer.txRef && transfer.txRef.indexOf('#LOW_CREDIT_AUTO_CANCEL#') >= 0;

        const dx: any = {
          status: 'process',
          title: t(transfer.isRetirement ? 'view:tlRetCancelTitle' : 'view:tlTxCancelTitle'),
          subTitle: DateTime.fromMillis(Number(transfer.txTime!)).toFormat(dateTimeFormat),
          description: (
            <TimelineBody
              text={formatString(
                systemCancel
                  ? 'view:tlTxCancelSystemDesc'
                  : lowCreditSystemCancel
                  ? 'view:tlTxLowCreditCancelSystemDesc'
                  : 'view:tlTxCancelDesc',
                [
                  addCommSep(transfer.creditAmount),
                  creditUnit,
                  transfer.sender[0]?.name,
                  transfer.isRetirement && transfer.toCompanyMeta?.countryName
                    ? transfer.toCompanyMeta.countryName
                    : transfer.receiver[0]?.name,
                  systemCancel
                    ? transfer.txRef?.split('#')[4]
                    : lowCreditSystemCancel
                    ? ''
                    : transfer.requester[0]?.name,
                  transfer.txRef?.split('#')[5],
                ]
              )}
              remark={transfer.txRef?.split('#')[0]}
              via={transfer.userName}
              t={t}
            />
          ),
          icon: (
            <span
              className={`step-icon ${transfer.isRetirement ? 'retire-step' : 'transfer-step'}`}
            >
              <Icon.ExclamationOctagon />
            </span>
          ),
        };
        addElement(dx, Number(transfer.txTime!), hist);
      }
    }
    return hist;
  };

  const displayHideNdcDocumentAvailabilityIndicators = (
    activityList: any,
    upcomingTimeLineMonitoringVisible: boolean,
    upcomingTimeLineVerificationVisible: boolean
  ) => {
    const monitoringElIndex = activityList.findIndex(
      (item: any) => item.title === t('view:monitoringEl')
    );
    const verificationElIndex = activityList.findIndex(
      (item: any) => item.title === t('view:verificationEl')
    );

    if (upcomingTimeLineMonitoringVisible && data?.currentStage !== ProgrammeStageR.Rejected) {
      if (monitoringElIndex === -1) {
        const monitoringEl = {
          status: 'process',
          title: t('view:monitoringEl'),
          subTitle: t('view:tlPending'),
          icon: (
            <span className="step-icon upcom-issue-step">
              <Icon.Binoculars />
            </span>
          ),
        };

        if (
          activityList.length > 0 &&
          activityList[0].title === t('view:tlIssue') &&
          activityList[0].subTitle === t('view:tlPending')
        ) {
          activityList.splice(1, 0, monitoringEl);
        } else {
          activityList.unshift(monitoringEl);
        }
      }
    } else {
      if (monitoringElIndex !== -1) {
        activityList.splice(monitoringElIndex, 1);
      }
    }

    if (upcomingTimeLineVerificationVisible && data?.currentStage !== ProgrammeStageR.Rejected) {
      if (verificationElIndex === -1) {
        const verificationEl = {
          status: 'process',
          title: t('view:verificationEl'),
          subTitle: t('view:tlPending'),
          icon: (
            <span className="step-icon upcom-issue-step">
              <Icon.Flag />
            </span>
          ),
        };

        if (
          activityList.length > 0 &&
          activityList[0].title === t('view:tlIssue') &&
          activityList[0].subTitle === t('view:tlPending')
        ) {
          activityList.splice(1, 0, verificationEl);
        } else {
          activityList.unshift(verificationEl);
        }
      }
    } else {
      if (verificationElIndex !== -1) {
        activityList.splice(verificationElIndex, 1);
      }
    }

    return activityList;
  };

  const getProgrammeHistory = async (programmeId: string) => {
    setLoadingHistory(true);
    try {
      const historyPromise = get(`national/programme/getHistory?programmeId=${programmeId}`);
      const transferPromise = get(
        `national/programme/transfersByProgrammeId?programmeId=${programmeId}`
      );

      const [response, transfers] = await Promise.all([historyPromise, transferPromise]);

      let upcomingTimeLineMonitoringVisible = false;
      let upcomingTimeLineVerificationVisible = false;

      if (data) {
        data?.mitigationActions?.map((mitigationAction: any) => {
          if (mitigationAction.projectMaterial && mitigationAction.projectMaterial.length > 0) {
            const monitoringReportAvailable = mitigationAction.projectMaterial.find((item: any) => {
              return item.includes('MONITORING_REPORT');
            });

            const verificationReportAvailable = mitigationAction.projectMaterial.find(
              (item: any) => {
                return item.includes('VERIFICATION_REPORT');
              }
            );

            if (!monitoringReportAvailable) {
              upcomingTimeLineMonitoringVisible = true;
            }
            if (!verificationReportAvailable) {
              upcomingTimeLineVerificationVisible = true;
            }
          } else {
            upcomingTimeLineMonitoringVisible = true;
            upcomingTimeLineVerificationVisible = true;
          }
        });
      }

      const txDetails: any = {};
      const txList = await getTxActivityLog(transfers.data, txDetails);
      let txListKeys = Object.keys(txList).sort();
      const certifiedTime: any = {};
      let activityList: any[] = [];
      for (const activity of response.data) {
        let programmecreateindex: any;
        const createIndex = activityList.findIndex((item) => item.title === t('view:tlCreate'));
        const upcomCreditIndex = activityList.findIndex(
          (item) => item.subTitle === t('view:tlPending')
        );
        const upcomAuthorisationIndex = activityList.findIndex(
          (item) => item.title === 'Authorisation'
        );
        if (createIndex !== -1) {
          programmecreateindex = createIndex;
        }
        let el = undefined;
        let newEl = undefined;
        let creditEl = undefined;
        let upcomingAuthorisation: any;
        const day = Math.floor(
          DateTime.now().diff(DateTime.fromMillis(activity.data.txTime), 'days').days
        );
        if (activity.data.txType === TxType.CREATE) {
          if (day === 1) {
            upcomingAuthorisation = `Awaiting Action : ${day} Day`;
          } else {
            upcomingAuthorisation = `Awaiting Action : ${day} Days`;
          }
          el = {
            status: 'process',
            title: t('view:tlCreate'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: <TimelineBody text={formatString('view:tlCreateDesc', [])} t={t} />,
            icon: (
              <span className="step-icon created-step">
                <Icon.CaretRight />
              </span>
            ),
          };
          newEl = {
            status: 'process',
            title: t('view:tlAuthorisation'),
            subTitle: upcomingAuthorisation,
            icon: (
              <span className="step-icon upcom-auth-step">
                <Icon.ClipboardCheck />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.AUTH) {
          el = {
            status: 'process',
            title: t('view:tlAuth'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlAuthDesc', [
                  addCommSep(activity.data.creditEst),
                  creditUnit,
                  DateTime.fromMillis(activity.data.endTime * 1000).toFormat(dateFormat),
                  activity.data.serialNo,
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon auth-step">
                <Icon.ClipboardCheck />
              </span>
            ),
          };
          if (upcomAuthorisationIndex !== -1) {
            activityList.splice(upcomAuthorisationIndex, 1);
          }
        } else if (activity.data.txType === TxType.ISSUE) {
          el = {
            status: 'process',
            title: t('view:tlIssue'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString(
                  'view:tlIssueDesc',
                  getTxRefValues(activity.data.txRef, 4)
                    ? [
                        addNdcDesc({
                          ndcActions: getTxRefValues(activity.data.txRef, 4),
                          t: t,
                          creditUnit: creditUnit,
                        }),
                        getTxRefValues(activity.data.txRef, 1),
                      ]
                    : [
                        `${addCommSep(activity.data.creditChange)} ${creditUnit} credits`,
                        getTxRefValues(activity.data.txRef, 1),
                      ]
                )}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon issue-step">
                <Icon.Award />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.REJECT) {
          el = {
            status: 'process',
            title: t('view:tlReject'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlRejectDesc', [getTxRefValues(activity.data.txRef, 1)])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon reject-step">
                <Icon.XOctagon />
              </span>
            ),
          };
          if (upcomAuthorisationIndex !== -1) {
            activityList.splice(upcomAuthorisationIndex, 1);
          }
          if (upcomCreditIndex !== -1) {
            activityList.splice(upcomCreditIndex, 1);
          }
        } else if (activity.data.txType === TxType.TRANSFER) {
          el = {
            status: 'process',
            title: t('view:tlTransfer'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlTransferDesc', [
                  addCommSep(activity.data.creditChange),
                  creditUnit,
                  getTxRefValues(activity.data.txRef, 6),
                  getTxRefValues(activity.data.txRef, 4),
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 9)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon transfer-step">
                <Icon.BoxArrowRight />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.REVOKE) {
          const type = getTxRefValues(activity.data.txRef, 4);
          let revokeComp = undefined;
          if (type === 'SUSPEND_REVOKE') {
            revokeComp = getTxRefValues(activity.data.txRef, 5);
          }
          el = {
            status: 'process',
            title: t('view:tlRevoke'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlRevokeDesc', [
                  revokeComp !== undefined ? `due to the deactivation of ${revokeComp}` : '',
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon revoke-step">
                <Icon.ShieldExclamation />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.CERTIFY) {
          el = {
            status: 'process',
            title: t('view:tlCertify'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlCertifyDesc', [getTxRefValues(activity.data.txRef, 1)])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon cert-step">
                <Icon.ShieldCheck />
              </span>
            ),
          };
          const cid = getTxRefValues(activity.data.txRef, 2);
          if (cid) {
            certifiedTime[cid] = DateTime.fromMillis(activity.data.txTime).toFormat('dd LLLL yyyy');
          }
        } else if (activity.data.txType === TxType.RETIRE) {
          const reqID = getTxRefValues(activity.data.txRef, 7);
          const tx = reqID ? txDetails[reqID!] : undefined;
          const crossCountry = tx ? tx.toCompanyMeta?.countryName : undefined;
          el = {
            status: 'process',
            title: t('view:tlRetire'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlRetireDesc', [
                  addCommSep(activity.data.creditChange),
                  creditUnit,
                  getTxRefValues(activity.data.txRef, 6),
                  `${crossCountry ? 'to ' + crossCountry : ''} `,
                  getRetirementTypeString(tx?.retirementType)?.toLowerCase(),
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 9)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon retire-step">
                <Icon.Save />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.FREEZE) {
          el = {
            status: 'process',
            title: t('view:tlFrozen'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlFrozenDesc', [
                  addCommSep(activity.data.creditChange),
                  creditUnit,
                  getTxRefValues(activity.data.txRef, 4),
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon freeze-step">
                <Icon.Stopwatch />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.UNFREEZE) {
          el = {
            status: 'process',
            title: t('view:tlUnFrozen'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlUnFrozenDesc', [
                  addCommSep(activity.data.creditChange),
                  creditUnit,
                  getTxRefValues(activity.data.txRef, 4),
                  getTxRefValues(activity.data.txRef, 1),
                ])}
                remark={getTxRefValues(activity.data.txRef, 3)}
                via={activity.data.userName}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon freeze-step">
                <Icon.ArrowCounterclockwise />
              </span>
            ),
          };
        } else if (activity.data.txType === TxType.OWNERSHIP_UPDATE) {
          el = {
            status: 'process',
            title: t('view:tlOwnership'),
            subTitle: DateTime.fromMillis(activity.data.txTime).toFormat(dateTimeFormat),
            description: (
              <TimelineBody
                text={formatString('view:tlOwnershipDesc', [
                  getTxRefValues(activity.data.txRef, 1),
                  getTxRefValues(activity.data.txRef, 4) + '%',
                ])}
                t={t}
              />
            ),
            icon: (
              <span className="step-icon issue-step">
                <Icon.PersonAdd />
              </span>
            ),
          };
        }
        if (
          activity.data.creditEst !== activity.data.creditIssued &&
          activity.data.txType !== TxType.REJECT
        ) {
          creditEl = {
            status: 'process',
            title: t('view:tlIssue'),
            subTitle: t('view:tlPending'),
            icon: (
              <span className="step-icon upcom-issue-step">
                <Icon.Award />
              </span>
            ),
          };
          activityList.splice(upcomCreditIndex, 1);
        }
        if (activity.data.creditEst === activity.data.creditIssued) {
          if (upcomCreditIndex !== -1) {
            activityList.splice(upcomCreditIndex, 1);
          }
        }
        if (el) {
          const toDelete = [];
          for (const txT of txListKeys) {
            if (Number(activity.data.txTime) > Number(txT)) {
              activityList.unshift(...txList[txT]);
              toDelete.push(txT);
            } else {
              break;
            }
          }
          toDelete.forEach((e) => delete txList[e]);
          txListKeys = Object.keys(txList).sort();
          activityList.unshift(el);
        }
        if (newEl) {
          const insertIndexauth = Number(programmecreateindex) + 1;
          activityList.splice(insertIndexauth, 0, newEl);
        }
        if (creditEl) {
          activityList.splice(0, 0, creditEl);
        }
      }

      for (const txT of txListKeys) {
        activityList.unshift(...txList[txT]);
      }

      activityList = displayHideNdcDocumentAvailabilityIndicators(
        activityList,
        upcomingTimeLineMonitoringVisible,
        upcomingTimeLineVerificationVisible
      );

      setHistoryData(activityList);
      setLoadingHistory(false);
      setCertTimes(certifiedTime);
      genCerts(state.record, certifiedTime);
    } catch (error: any) {
      console.log('Error in getting programme', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoadingHistory(false);
    }
    return null;
  };

  const updateProgrammeData = (response: any) => {
    setData(response.data);
    state.record = response.data;
    navigate('.', { state: { record: response.data } });
    genCerts(response.data, certTimes);
    genPieData(response.data);
  };

  const getSuccessMsg = (response: any, initMsg: string, successMsg: string) => {
    return response.data instanceof Array ? initMsg : successMsg;
  };

  const updateCreditInfo = (response: any) => {
    if (!(response.data instanceof Array) && response.data && data) {
      response.data.company = data.company;
      response.data.certifier = data.certifier;
      setData(response.data);
      state.record = response.data;
      navigate('.', { state: { record: response.data } });
      genCerts(response.data, certTimes);
      genPieData(response.data);
    }
  };

  const mitigationData = (mitigation: any) => {
    if (!mitigation) {
      return {};
    }
    let calculations: any = {};
    if (mitigation.typeOfMitigation === TypeOfMitigation.AGRICULTURE) {
      if (mitigation.subTypeOfMitigation === SubTypeOfMitigation.RICE_CROPS) {
        if (mitigation.properties) {
          calculations = mitigation.properties;
          if (calculations.landAreaUnit) {
            calculations.landArea = new UnitField(
              mitigation.properties.landAreaUnit,
              addCommSep(mitigation.properties.landArea)
            );
          }
          delete calculations.landAreaUnit;
        }
      } else if (mitigation.subTypeOfMitigation === SubTypeOfMitigation.SOIL_ENRICHMENT_BIOCHAR) {
        if (mitigation.properties) {
          calculations = mitigation.properties;
          if (calculations.weight) {
            calculations.weightInTons = addCommSep(mitigation.properties.weight);
          }
          delete calculations.weight;
        }
      }
    } else if (mitigation.typeOfMitigation === TypeOfMitigation.SOLAR) {
      if (mitigation.properties) {
        calculations = mitigation.properties;
        if (calculations.energyGenerationUnit) {
          calculations.energyGeneration = new UnitField(
            mitigation.properties.energyGenerationUnit,
            addCommSep(mitigation.properties.energyGeneration)
          );
          // addCommSep(data.solarProperties.energyGeneration) +
          // ' ' +
          // data.solarProperties.energyGenerationUnit;
        } else if (calculations.consumerGroup && typeof calculations.consumerGroup === 'string') {
          calculations.consumerGroup = (
            <Tag color={'processing'}>{addSpaces(calculations.consumerGroup)}</Tag>
          );
        }
        delete calculations.energyGenerationUnit;
      }
    } else {
      if (mitigation.properties) {
        calculations = mitigation.properties;
      }
    }
    calculations.constantVersion = mitigation.properties?.constantVersion;

    for (const key in mitigation) {
      if (mitigation.hasOwnProperty(key)) {
        if (key !== 'properties' && key !== 'projectMaterial') {
          if (key === 'userEstimatedCredits' || key === 'systemEstimatedCredits') {
            calculations[key] = addCommSep(mitigation[key]);
            if (key === 'systemEstimatedCredits' && mitigation[key] === 0) {
              calculations[key] = '-';
            }
          } else {
            if (key === 'constantVersion' && mitigation[key] === 'undefined') {
              calculations[key] = '-';
            } else if (key === 'typeOfMitigation') {
              mitigationTypeList?.map((type: any) => {
                if (mitigation[key] === type.value) {
                  calculations[key] = type.label;
                }
              });
            } else if (key === 'subTypeOfMitigation') {
              mitigationSubTypeList?.map((type: any) => {
                if (mitigation[key] === type.value) {
                  calculations[key] = type.label;
                }
              });
            } else if (key === 'methodology') {
              calculations[key] = mitigation[key];
            } else {
              calculations[key] = mitigation[key];
            }
          }
        }
      }
    }
    const { issuedCredits, availableCredits, ...details } = calculations;
    return details;
  };

  const onPopupAction = async (
    body: any,
    endpoint: any,
    successMsg: any,
    httpMode: any,
    successCB: any
  ) => {
    body.programmeId = data?.programmeId;
    let error;
    try {
      const response: any = await httpMode(`national/programme/${endpoint}`, body);
      if (response.statusCode < 300 || response.status < 300) {
        if (!response.data.certifier) {
          response.data.certifier = [];
        }
        setOpenModal(false);
        setComment(undefined);
        error = undefined;
        successCB(response);
        message.open({
          type: 'success',
          content: typeof successMsg !== 'function' ? successMsg : successMsg(response),
          duration: 3,
          style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
        });
      } else {
        error = response.message;
      }
      await getProgrammeHistory(data?.programmeId as string);
      return error;
    } catch (e: any) {
      error = e.message;
      return error;
    }
  };

  const onAction = async (action: string, body: any = undefined) => {
    let error = undefined;
    if (body) {
      body.programmeId = data?.programmeId;
      body.externalId = data?.externalId;
    } else {
      body = {
        comment: comment,
        programmeId: data?.programmeId,
        externalId: data?.externalId,
      };
    }
    try {
      if (action !== 'Transfer') {
        setConfirmLoading(true);
        const response: any = await put(
          `national/programme/${
            action === 'Reject'
              ? 'reject'
              : action === 'Authorise'
              ? 'authorize'
              : action === 'Certify'
              ? 'certify'
              : action === 'Issue'
              ? 'issue'
              : action === 'Revoke'
              ? 'revoke'
              : 'retire'
          }`,
          body
        );
        if (response.statusCode === 200 || response.status === 200) {
          if (!response.data.certifier) {
            response.data.certifier = [];
          }

          if (
            action === 'Authorise' ||
            action === 'Certify' ||
            action === 'Revoke' ||
            action === 'Issue'
          ) {
            setData(response.data);
            state.record = response.data;
            navigate('.', { state: { record: response.data } });
            genCerts(response.data, certTimes);
            genPieData(response.data);
          } else if (action === 'Reject') {
            data!.currentStage = ProgrammeStageR.Rejected;
            setData(data);
          }

          setOpenModal(false);
          setComment(undefined);
          error = undefined;
          message.open({
            type: 'success',
            content:
              action === 'Reject'
                ? t('view:successReject')
                : action === 'Authorise'
                ? t('view:successAuth')
                : action === 'Issue'
                ? 'Successfully issued'
                : action === 'Certify'
                ? 'Successfully certified'
                : action === 'Revoke'
                ? t('view:successRevokeCertifcate')
                : t('view:successRetire'),
            duration: 3,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
        } else {
          message.open({
            type: 'error',
            content: response.message,
            duration: 3,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
          error = response.message;
        }

        await getProgrammeHistory(data?.programmeId as string);

        setConfirmLoading(false);
        return error;
      }
    } catch (e: any) {
      message.open({
        type: 'error',
        content: e.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setConfirmLoading(false);
      error = e.message;
      return error;
    }
  };

  const mapArrayToi18n = (map: any) => {
    if (!map) {
      return {};
    }

    const info: any = {};
    Object.entries(map).forEach(([k, v]) => {
      const text = t('view:' + k);
      if (v instanceof UnitField) {
        info[text + ` (${v.unit})`] = v.value;
      } else {
        info[text] = v;
      }
    });
    return info;
  };

  const getUserDetails = async () => {
    setLoadingAll(true);
    try {
      const response: any = await post('national/user/query', {
        page: 1,
        size: 10,
        filterAnd: [
          {
            key: 'id',
            operation: '=',
            value: userInfoState?.id,
          },
        ],
      });
      if (response && response.data) {
        if (
          response?.data[0]?.companyRole === CompanyRole.MINISTRY &&
          response?.data[0]?.company &&
          response?.data[0]?.company?.sectoralScope
        ) {
          setMinistrySectoralScope(response?.data[0]?.company?.sectoralScope);
        }
      }
      setLoadingAll(false);
    } catch (error: any) {
      console.log('Error in getting users', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    if (userInfoState?.companyRole === CompanyRole.MINISTRY) {
      getUserDetails();
    }

    if (state && state.record) {
      setLoadingAll(false);
      setData(state.record);
    } else {
      if (id) {
        getProgrammeById(id);
      } else {
        navigate('/programmeManagement/viewAll', { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      getProgrammeHistory(data.programmeId);
      drawMap();
      for (const company of data.company) {
        if (
          parseInt(company.state) === CompanyState.ACTIVE.valueOf() &&
          company.companyId !== userInfoState?.companyId
        ) {
          setIsAllOwnersDeactivated(false);
          break;
        }
      }
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  const pieChartData = getPieChartData(data);
  const percentages: any[] = [];

  const companies: any = {};
  for (const c of data.company) {
    companies[c.companyId] = c;
  }
  data.companyId.forEach((obj: any, index: number) => {
    percentages.push({
      company: companies[obj],
      percentage: data.proponentPercentage ? data.proponentPercentage[index] : 100,
    });
  });
  percentages.sort((a: any, b: any) => b.percentage - a.percentage);

  const elements = percentages.map((ele: any, index: number) => {
    return (
      <div className="">
        <div className="company-info">
          {isBase64(ele.company.logo) ? (
            <img alt="company logo" src={'data:image/jpeg;base64,' + ele.company.logo} />
          ) : ele.company.logo ? (
            <img alt="company logo" src={ele.company.logo} />
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
          <OrganisationStatus
            organisationStatus={parseInt(ele.company.state)}
            t={companyProfileTranslations}
          ></OrganisationStatus>
        </div>
      </div>
    );
  });
  // genCerts(data);
  const actionBtns = [];

  if (userInfoState?.userRole !== 'ViewOnly') {
    if (data.currentStage.toString() === ProgrammeStageR.Approved) {
      if (userInfoState?.companyRole === CompanyRole.GOVERNMENT || ministryLevelPermission) {
        actionBtns.push(
          <Button
            danger
            onClick={() => {
              setActionInfo({
                action: 'Reject',
                text: t('view:popupText'),
                type: 'danger',
                title: `${t('view:rejectTitle')} - ${data.title}?`,
                remark: true,
                icon: <Icon.ClipboardX />,
              });
              showModal();
            }}
          >
            {t('view:reject')}
          </Button>
        );
        actionBtns.push(
          <Button
            type="primary"
            onClick={() => {
              setActionInfo({
                action: 'Authorise',
                text: t('view:popupText'),
                title: `${t('view:authTitle')} - ${data.title}?`,
                type: 'primary',
                remark: false,
                icon: <Icon.ClipboardCheck />,
                contentComp: (
                  <ProgrammeIssueForm
                    enableIssue={false}
                    programme={data}
                    subText={t('view:popupText')}
                    onCancel={() => {
                      setOpenModal(false);
                      setComment(undefined);
                    }}
                    actionBtnText={t('view:authorise')}
                    onFinish={(body: any) =>
                      onPopupAction(
                        body,
                        'authorize',
                        t('view:successAuth'),
                        put,
                        updateProgrammeData
                      )
                    }
                    translator={i18n}
                  />
                ),
              });
              showModal();
            }}
          >
            {t('view:authorise')}
          </Button>
        );
      }
    } else if (
      data.currentStage.toString() === ProgrammeStageR.Authorised &&
      Number(data.creditEst) > Number(data.creditIssued)
    ) {
      if (userInfoState?.companyRole === CompanyRole.GOVERNMENT || ministryLevelPermission) {
        if (
          Number(data.creditEst) > Number(data.creditIssued) &&
          getValidNdcActions(data).length > 0
        ) {
          actionBtns.push(
            <Button
              type="primary"
              onClick={() => {
                setActionInfo({
                  action: 'Issue',
                  text: t('view:popupText'),
                  title: `${t('view:issueTitle')} - ${data.title}?`,
                  type: 'primary',
                  remark: false,
                  icon: <Icon.Award />,
                  contentComp: (
                    <ProgrammeIssueForm
                      enableIssue={true}
                      programme={data}
                      subText={t('view:popupText')}
                      onCancel={() => {
                        setOpenModal(false);
                        setComment(undefined);
                      }}
                      actionBtnText={t('view:issue')}
                      onFinish={(body: any) =>
                        onPopupAction(
                          body,
                          'issue',
                          t('view:successIssue'),
                          put,
                          updateProgrammeData
                        )
                      }
                      translator={i18n}
                      ndcActions={getValidNdcActions(data)}
                    />
                  ),
                });
                showModal();
              }}
            >
              {t('view:issue')}
            </Button>
          );
        }
      }
    }

    if (
      userInfoState &&
      userInfoState.companyState !== CompanyState.SUSPENDED.valueOf() &&
      data.certifier &&
      userInfoState?.companyRole === CompanyRole.CERTIFIER &&
      !data.certifier.map((e) => e.companyId).includes(userInfoState?.companyId)
    ) {
      actionBtns.push(
        <Button
          type="primary"
          onClick={() => {
            setActionInfo({
              action: 'Certify',
              text: ``,
              title: `${t('view:certifyTitle')} - ${data.title}?`,
              type: 'success',
              remark: false,
              icon: <ShieldCheck />,
            });
            showModal();
          }}
        >
          {t('view:certify')}
        </Button>
      );
    }
    if (
      userInfoState &&
      userInfoState.companyState !== CompanyState.SUSPENDED.valueOf() &&
      data.certifier &&
      data.certifier.length > 0 &&
      ((userInfoState?.companyRole === CompanyRole.CERTIFIER &&
        data.certifier.map((e) => e.companyId).includes(userInfoState?.companyId)) ||
        userInfoState?.companyRole === CompanyRole.GOVERNMENT ||
        ministryLevelPermission)
    ) {
      actionBtns.push(
        <Button
          danger
          onClick={() => {
            setActionInfo({
              action: 'Revoke',
              title: `${t('view:revokeTitle')} - ${data.title}?`,
              text: ``,
              type: 'danger',
              remark: true,
              icon: <Icon.ShieldExclamation />,
              contentComp: (
                <ProgrammeRevokeForm
                  programme={data}
                  subText={t('view:popupText')}
                  onCancel={() => {
                    setOpenModal(false);
                    setComment(undefined);
                  }}
                  actionBtnText={t('view:revoke')}
                  onFinish={(body: any) =>
                    onPopupAction(
                      body,
                      'revoke',
                      t('view:successRevokeCertifcate'),
                      put,
                      updateProgrammeData
                    )
                  }
                  showCertifiers={
                    userInfoState.companyRole === CompanyRole.GOVERNMENT ||
                    userInfoState.companyRole === CompanyRole.MINISTRY
                  }
                  translator={i18n}
                />
              ),
            });
            showModal();
          }}
        >
          {t('view:revoke')}
        </Button>
      );
    }
  }

  // }
  const generalInfo: any = {};
  Object.entries(getGeneralFields(data)).forEach(([k, v]) => {
    const text = t('view:' + k);
    if (k === 'currentStatus') {
      generalInfo[text] = (
        <Tag color={getStageTagType(v as ProgrammeStageR)}>{getStageEnumVal(v as string)}</Tag>
      );
    } else if (k === 'sector') {
      generalInfo[text] = (
        <Tag color={v === 'Agriculture' ? 'success' : 'processing'}>{v as string}</Tag>
      );
    } else if (k === 'applicationType') {
      generalInfo[text] = (
        <span>
          <RoleIcon icon={<ExperimentOutlined />} bg={DevBGColor} color={DevColor} />
          <span>{v as string}</span>
        </span>
      );
    } else {
      generalInfo[text] = v;
    }
  });

  const mitigationWidgets = data?.mitigationActions?.map((ele: any, index: number) => {
    return (
      <Card className="card-container">
        <div>
          <InfoView
            data={mapArrayToi18n(mitigationData(ele))}
            title={t('view:calculation') + ' - ' + ele?.actionId}
            icon={<BulbOutlined />}
          />
          {ele.projectMaterial && ele.projectMaterial.length > 0 && (
            <div className="info-view only-head">
              <div className="title">
                <span className="title-icon"></span>
                <span className="title-text" style={{ marginLeft: '15px' }}>
                  {t('view:projectMaterial')}
                </span>
                <div>{getFileContent(ele.projectMaterial)}</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  });

  const creditsActionPermissions =
    userInfoState?.companyRole === CompanyRole.GOVERNMENT || ministryLevelPermission;

  const reqBtnPermissions =
    userInfoState?.companyRole !== CompanyRole.MINISTRY
      ? !isAllOwnersDeactivated &&
        userInfoState!.companyState !== CompanyState.SUSPENDED.valueOf() &&
        !isTransferFrozen
      : ministrySectoralScope.includes(data.sectoralScope) &&
        !isAllOwnersDeactivated &&
        userInfoState!.companyState !== CompanyState.SUSPENDED.valueOf() &&
        !isTransferFrozen &&
        userInfoState?.userRole !== Role.ViewOnly;

  return loadingAll ? (
    <Loading />
  ) : (
    <div className="content-container programme-view">
      <div className="title-bar">
        <div>
          <div className="body-title">{t('view:details')}</div>
          <div className="body-sub-title">{t('view:desc')}</div>
        </div>
        <div className="flex-display action-btns">
          {userInfoState?.userRole !== 'ViewOnly' && actionBtns}
        </div>
      </div>
      <div className="content-body">
        <Row gutter={16}>
          <Col md={24} lg={10}>
            <Card className="card-container">
              <div className="info-view">
                <div className="title">
                  <span className="title-icon">
                    {
                      <span className="b-icon">
                        <Icon.Building />
                      </span>
                    }
                  </span>
                  <span className="title-text">{t('view:programmeOwner')}</span>
                </div>
                <div className="centered-card">{elements}</div>
              </div>
            </Card>
            {getStageEnumVal(data.currentStage) === ProgrammeStageR.Authorised ? (
              <Card className="card-container">
                <div className="info-view">
                  <div className="title">
                    <span className="title-icon">{<BlockOutlined />}</span>
                    <span className="title-text">{t('view:credits')}</span>
                  </div>
                  <div className="map-content">
                    <Chart
                      id={'creditChart'}
                      options={{
                        labels: ['Authorised', 'Issued', 'Transferred', 'Retired', 'Frozen'],
                        legend: {
                          position: 'bottom',
                        },
                        colors: ['#6ACDFF', '#D2FDBB', '#CDCDCD', '#FF8183', '#B7A4FE'],
                        tooltip: {
                          fillSeriesColor: false,
                          enabled: true,
                          y: {
                            formatter: function (value: any) {
                              return addCommSepRound(value);
                            },
                          },
                        },
                        states: {
                          normal: {
                            filter: {
                              type: 'none',
                              value: 0,
                            },
                          },
                          hover: {
                            filter: {
                              type: 'none',
                              value: 0,
                            },
                          },
                          active: {
                            allowMultipleDataPointsSelection: true,
                            filter: {
                              type: 'darken',
                              value: 0.7,
                            },
                          },
                        },
                        stroke: {
                          colors: ['#00'],
                        },
                        plotOptions: {
                          pie: {
                            expandOnClick: false,
                            donut: {
                              labels: {
                                show: true,
                                total: {
                                  showAlways: true,
                                  show: true,
                                  label: 'Total',
                                  formatter: () => '' + addCommSepRound(data.creditEst),
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
                      series={pieChartData}
                      type="donut"
                      width="100%"
                      fontFamily="inter"
                    />
                    {userInfoState?.userRole !== 'ViewOnly' &&
                      userInfoState?.companyRole !== 'Certifier' && (
                        <div className="flex-display action-btns">
                          {data.currentStage.toString() === ProgrammeStageR.Authorised &&
                            data.creditBalance -
                              (data.creditFrozen
                                ? data.creditFrozen.reduce(
                                    (a, b) => numIsExist(a) + numIsExist(b),
                                    0
                                  )
                                : 0) >
                              0 &&
                            !isTransferFrozen && (
                              <div>
                                {((creditsActionPermissions && !isAllOwnersDeactivated) ||
                                  (data.companyId
                                    .map((e) => Number(e))
                                    .includes(userInfoState!.companyId) &&
                                    userInfoState!.companyState !==
                                      CompanyState.SUSPENDED.valueOf())) && (
                                  <span>
                                    <Button
                                      danger
                                      onClick={() => {
                                        setActionInfo({
                                          action: 'Retire',
                                          text: t('view:popupText'),
                                          title: t('view:retireTitle'),
                                          type: 'primary',
                                          remark: true,
                                          icon: <Icon.Save />,
                                          contentComp: (
                                            <ProgrammeRetireForm
                                              hideType={
                                                userInfoState?.companyRole !==
                                                  CompanyRole.GOVERNMENT &&
                                                userInfoState?.companyRole !== CompanyRole.MINISTRY
                                              }
                                              myCompanyId={userInfoState?.companyId}
                                              programme={data}
                                              onCancel={() => {
                                                setOpenModal(false);
                                                setComment(undefined);
                                              }}
                                              actionBtnText={t('view:retire')}
                                              onFinish={(body: any) =>
                                                onPopupAction(
                                                  body,
                                                  'retire',
                                                  (response: any) =>
                                                    getSuccessMsg(
                                                      response,
                                                      t('view:successRetireInit'),
                                                      t('view:successRetire')
                                                    ),
                                                  put,
                                                  updateCreditInfo
                                                )
                                              }
                                              translator={i18n}
                                              useConnection={useConnection}
                                            />
                                          ),
                                        });
                                        showModal();
                                      }}
                                    >
                                      {t('view:retire')}
                                    </Button>
                                    <Button
                                      type="primary"
                                      onClick={() => {
                                        setActionInfo({
                                          action: 'Send',
                                          text: '',
                                          title: t('view:sendCreditTitle'),
                                          type: 'primary',
                                          remark: true,
                                          icon: <Icon.BoxArrowRight />,
                                          contentComp: (
                                            <ProgrammeTransferForm
                                              companyRole={userInfoState!.companyRole}
                                              receiverLabelText={t('view:to')}
                                              userCompanyId={userInfoState?.companyId}
                                              programme={data}
                                              subText={t('view:popupText')}
                                              onCancel={() => {
                                                setOpenModal(false);
                                                setComment(undefined);
                                              }}
                                              actionBtnText={t('view:send')}
                                              onFinish={(body: any) =>
                                                onPopupAction(
                                                  body,
                                                  'transferRequest',
                                                  (response: any) =>
                                                    getSuccessMsg(
                                                      response,
                                                      t('view:successSendInit'),
                                                      t('view:successSend')
                                                    ),
                                                  post,
                                                  updateCreditInfo
                                                )
                                              }
                                              translator={i18n}
                                              useConnection={useConnection}
                                              ministryLevelPermission={ministryLevelPermission}
                                            />
                                          ),
                                        });
                                        showModal();
                                      }}
                                    >
                                      {t('view:send')}
                                    </Button>
                                  </span>
                                )}
                                {reqBtnPermissions && (
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      setActionInfo({
                                        action: 'Request',
                                        text: '',
                                        title: t('view:transferTitle'),
                                        type: 'primary',
                                        remark: true,
                                        icon: <Icon.BoxArrowInRight />,
                                        contentComp: (
                                          <ProgrammeTransferForm
                                            companyRole={userInfoState!.companyRole}
                                            userCompanyId={userInfoState?.companyId}
                                            receiverLabelText={t('view:by')}
                                            disableToCompany={true}
                                            toCompanyDefault={{
                                              label: userInfoState?.companyName,
                                              value: userInfoState?.companyId,
                                            }}
                                            programme={data}
                                            subText={t('view:popupText')}
                                            onCancel={() => {
                                              setOpenModal(false);
                                              setComment(undefined);
                                            }}
                                            actionBtnText={t('view:request')}
                                            onFinish={(body: any) =>
                                              onPopupAction(
                                                body,
                                                'transferRequest',
                                                t('view:successRequest'),
                                                post,
                                                updateCreditInfo
                                              )
                                            }
                                            useConnection={useConnection}
                                            translator={i18n}
                                          />
                                        ),
                                      });
                                      showModal();
                                    }}
                                  >
                                    {t('view:transfer')}
                                  </Button>
                                )}
                              </div>
                            )}
                        </div>
                      )}
                  </div>
                </div>
              </Card>
            ) : (
              <div></div>
            )}
            {data.programmeProperties.programmeMaterials &&
              data.programmeProperties.programmeMaterials.length > 0 && (
                <Card className="card-container">
                  <div className="info-view only-head">
                    <div className="title">
                      <span className="title-icon">{<Icon.Grid />}</span>
                      <span className="title-text">{t('view:programmeMaterial')}</span>
                      <div>{getFileContent(data.programmeProperties.programmeMaterials)}</div>
                    </div>
                  </div>
                </Card>
              )}
            {/* {data.programmeProperties.projectMaterial &&
              data.programmeProperties.projectMaterial.length > 0 && (
                <Card className="card-container">
                  <div className="info-view">
                    <div className="title">
                      <span className="title-icon">{<Icon.FileEarmarkText />}</span>
                      <span className="title-text">{t('view:projectMaterial')}</span>
                      <div>{getFileContent(data.programmeProperties.projectMaterial)}</div>
                    </div>
                  </div>
                </Card>
              )} */}
            <Card className="card-container">
              <div>
                <InfoView
                  data={mapArrayToi18n(getFinancialFields(data))}
                  title={t('view:financial')}
                  icon={
                    <span className="b-icon">
                      <Icon.Cash />
                    </span>
                  }
                />
              </div>
            </Card>
          </Col>
          <Col md={24} lg={14}>
            <Card className="card-container">
              <div>
                <InfoView data={generalInfo} title={t('view:general')} icon={<BulbOutlined />} />
              </div>
            </Card>
            {mapType !== MapTypes.None ? (
              <Card className="card-container">
                <div className="info-view">
                  <div className="title">
                    <span className="title-icon">{<Icon.PinMap />}</span>
                    <span className="title-text">{t('view:location')}</span>
                  </div>
                  <div className="map-content">
                    <MapComponent
                      mapType={mapType}
                      center={centerPoint}
                      zoom={4}
                      markers={markers}
                      height={250}
                      style="mapbox://styles/mapbox/streets-v11"
                      accessToken={accessToken}
                    ></MapComponent>
                    <Row className="region-list">
                      {data.programmeProperties.geographicalLocation &&
                        data.programmeProperties.geographicalLocation.map((e: any, idx: number) => (
                          <Col className="loc-tag">
                            {data.geographicalLocationCordintes &&
                              data.geographicalLocationCordintes[idx] !== null &&
                              data.geographicalLocationCordintes[idx] !== undefined && (
                                <span
                                  style={{
                                    color: locationColors[(idx + 1) % locationColors.length],
                                  }}
                                  className="loc-icon"
                                >
                                  {<Icon.GeoAltFill />}
                                </span>
                              )}
                            <span className="loc-text">{e}</span>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              </Card>
            ) : (
              ''
            )}
            {mitigationWidgets && mitigationWidgets}
            {certs.length > 0 ? (
              <Card className="card-container">
                <div className="info-view">
                  <div className="title">
                    <span className="title-icon">{<SafetyOutlined />}</span>
                    <span className="title-text">{t('view:certification')}</span>
                  </div>
                  <div className="cert-content">{certs}</div>
                </div>
              </Card>
            ) : (
              <span></span>
            )}
            <Card className="card-container">
              <div className="info-view">
                <div className="title">
                  <span className="title-icon">{<ClockCircleOutlined />}</span>
                  <span className="title-text">{t('view:timeline')}</span>
                </div>
                <div className="content">
                  {loadingHistory ? (
                    <Skeleton />
                  ) : (
                    <Steps current={0} direction="vertical" items={historyData} />
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title={
          <div className="popup-header">
            <div className="icon">{actionInfo.icon}</div>
            <div>{actionInfo.title}</div>
          </div>
        }
        className={'popup-' + actionInfo.type}
        open={openModal}
        width={Math.min(430, window.innerWidth)}
        centered={true}
        footer={null}
        onCancel={() => {
          setOpenModal(false);
          setComment(undefined);
        }}
        destroyOnClose={true}
      >
        {actionInfo.contentComp ? (
          actionInfo.contentComp
        ) : (
          <div>
            <p className="sub-text">{actionInfo.text}</p>
            <Form layout="vertical">
              <Form.Item
                className="mg-bottom-0"
                label={t('view:remarks')}
                name="remarks"
                required={actionInfo.remark}
              >
                <TextArea
                  defaultValue={comment}
                  rows={2}
                  onChange={(v) => setComment(v.target.value)}
                />
              </Form.Item>
            </Form>
            <div>
              <div className="footer-btn">
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    setComment(undefined);
                  }}
                >
                  {t('view:cancel')}
                </Button>
                <Button
                  disabled={actionInfo.remark && (!comment || comment.trim() === '')}
                  type="primary"
                  loading={confirmLoading}
                  onClick={() => onAction(actionInfo.action)}
                >
                  {actionInfo.action}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProgrammeView;
