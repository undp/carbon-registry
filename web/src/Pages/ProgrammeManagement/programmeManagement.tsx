import { Checkbox, Col, Empty, message, PaginationProps, Row, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import './programmeManagement.scss';
import '../Common/common.table.scss';
import { useNavigate } from 'react-router-dom';
import { TableDataType } from '../../Definitions/InterfacesAndType/userManagement.definitions';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { CertBGColor, DevBGColor, GovBGColor, TooltipColor } from '../Common/role.color.constants';
import ProfileIcon from '../../Components/ProfileIcon/profile.icon';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const ProgrammeManagement = () => {
  const navigate = useNavigate();
  const { get, delete: del, post } = useConnection();
  const [totalProgramme, setTotalProgramme] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filter, setFilter] = useState<any>([]);

  const statusOptions = [
    { label: 'Pending', value: 'AwaitingAuthorization' },
    { label: 'Issued', value: 'Issued' },
    { label: 'Transferred', value: 'Transferred' },
    { label: 'Retired', value: 'Retired' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  const [selectedStatus, setSelectedStatus] = useState<any>(statusOptions.map((e) => e.value));

  const getCompanyBgColor = (item: string) => {
    if (item === 'Government') {
      return GovBGColor;
    } else if (item === 'Certifier') {
      return CertBGColor;
    }
    return DevBGColor;
  };

  const onStatusQuery = async (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues);
    if (checkedValues !== selectedStatus) {
      setSelectedStatus(checkedValues);
    }
    setFilter([
      {
        key: 'currentStage',
        operation: 'in',
        value: checkedValues,
      },
    ]);
  };

  const columns = [
    {
      title: 'PROGRAMME NAME',
      dataIndex: 'title',
      key: 'title',
      align: 'left' as const,
    },
    {
      title: 'COMPANY',
      dataIndex: 'companyId',
      key: 'companyId',
      align: 'left' as const,
      render: (item: any, itemObj: any) => {
        const elements = item.map((obj: any) => {
          return (
            <Tooltip title={obj.name} color={TooltipColor} key={TooltipColor}>
              <div>
                <ProfileIcon
                  icon={obj.logo}
                  bg={getCompanyBgColor(obj.companyRole)}
                  name={obj.name}
                />
              </div>
            </Tooltip>
          );
        });
        return <div style={{ display: 'flex', alignItems: 'center' }}>{elements}</div>;
      },
    },
    {
      title: 'SECTOR',
      dataIndex: 'sector',
      key: 'sector',
      align: 'left' as const,
    },
    {
      title: 'STATUS',
      dataIndex: 'currentStage',
      key: 'currentStage',
      align: 'center' as const,
      render: (item: any) => {
        return item === 'AwaitingAuthorization' ? (
          <Tag className="clickable" color="error">
            Pending
          </Tag>
        ) : item === 'Issued' ? (
          <Tag className="clickable" color="processing">
            Issued
          </Tag>
        ) : item === 'Transferred' ? (
          <Tag className="clickable" color="success">
            item
          </Tag>
        ) : (
          <Tag className="clickable" color="default">
            item
          </Tag>
        );
      },
      onCell: (record: any, rowIndex: any) => {
        return {
          onClick: (ev: any) => {
            setSelectedStatus([record.currentStage]);
            onStatusQuery([record.currentStage]);
          },
        };
      },
    },
    {
      title: 'CREDITS ISSUED',
      dataIndex: 'creditIssued',
      key: 'creditIssued',
      align: 'right' as const,
      render: (item: any) => {
        return item
          ? Number(item)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '-';
      },
    },
    {
      title: 'CREDITS BALANCE',
      dataIndex: 'creditBalance',
      key: 'creditBalance',
      align: 'right' as const,
      render: (item: any) => {
        return item
          ? Number(item)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '-';
      },
    },
    {
      title: 'CREDITS TRANSFERRED',
      dataIndex: 'creditTransferred',
      key: 'creditTransferred',
      align: 'right' as const,
      render: (item: any) => {
        return item
          ? Number(item)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '-';
      },
    },
    {
      title: 'SERIAL NUMBER',
      dataIndex: 'serialNo',
      key: 'serialNo',
      align: 'left' as const,
    },
  ];
  // }

  const getAllProgramme = async () => {
    setLoading(true);
    try {
      const response: any = await post('programme/query', {
        page: currentPage,
        size: pageSize,
        filterAnd: filter,
      });
      setTableData(response.data);
      setTotalProgramme(response.response.data.total);
      setLoading(false);
    } catch (error: any) {
      console.log('Error in getting programme', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProgramme();
  }, [currentPage, pageSize, filter]);

  const onChange: PaginationProps['onChange'] = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="content-container programme-management">
      <div className="title-bar">
        <div className="body-title">View Programmes</div>
        <div className="body-sub-title">
          View all the visible programmes in the system based on your permissions
        </div>
      </div>
      <div className="content-card">
        <Row>
          <div className="action-bar">
            <Checkbox.Group
              options={statusOptions}
              defaultValue={statusOptions.map((e) => e.value)}
              value={selectedStatus}
              onChange={onStatusQuery}
            />
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <div className="programmeManagement-table-container">
              <Table
                dataSource={tableData}
                columns={columns}
                className="common-table-class"
                loading={loading}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalProgramme,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  onChange: onChange,
                }}
                // scroll={{ x: 1500 }}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={tableData.length === 0 ? 'No programmes' : null}
                    />
                  ),
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProgrammeManagement;
