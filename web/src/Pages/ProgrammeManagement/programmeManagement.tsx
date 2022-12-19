import { Col, Empty, message, PaginationProps, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import './programmeManagement.scss';
import '../Common/common.table.scss';
import { useNavigate } from 'react-router-dom';
import { TableDataType } from '../../Definitions/InterfacesAndType/userManagement.definitions';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { CertBGColor, DevBGColor, GovBGColor } from '../Common/role.color.constants';

const ProgrammeManagement = () => {
  const navigate = useNavigate();
  const { get, delete: del } = useConnection();
  const [totalProgramme, setTotalProgramme] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const getCompanyBgColor = (item: string) => {
    if (item === 'Government') {
      return GovBGColor;
    } else if (item === 'Certifier') {
      return CertBGColor;
    }
    return DevBGColor;
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
      // render: (item: any, itemObj: any) => {
      //   return (
      //     <div style={{ display: 'flex', alignItems: 'center' }}>
      //       <ProfileIcon
      //         icon={itemObj.logo}
      //         bg={getCompanyBgColor(itemObj.companyRole)}
      //         name={itemObj.name}
      //       />
      //       <div style={{ fontWeight: 600 }}>{item}</div>
      //     </div>
      //   );
      // },
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
    },
    {
      title: 'CREDITS ISSUED',
      dataIndex: 'creditIssued',
      key: 'creditIssued',
      align: 'right' as const,
      render: (item: any) => {
        return item ? item.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';
      },
    },
    {
      title: 'CREDITS BALANCE',
      dataIndex: 'creditBalance',
      key: 'creditBalance',
      align: 'right' as const,
      render: (item: any) => {
        return item ? item.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';
      },
    },
    {
      title: 'CREDITS TRANSFERRED',
      dataIndex: 'creditTransferred',
      key: 'creditTransferred',
      align: 'right' as const,
      render: (item: any) => {
        return item ? item.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';
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
      const response: any = await get('programme/query', {
        params: {
          page: currentPage,
          size: pageSize,
        },
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
  }, [currentPage, pageSize]);

  const onChange: PaginationProps['onChange'] = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="content-container">
      <div className="title-bar">
        <div className="body-title">View Programmes</div>
        <div className="body-sub-title">
          View all the visible programmes in the system based on your permissions
        </div>
      </div>
      <div className="content-card">
        <Row>
          <div className="action-bar"></div>
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
