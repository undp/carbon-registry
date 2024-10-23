import {
  AuditOutlined,
  BankOutlined,
  DownloadOutlined,
  ExperimentOutlined,
  FilterOutlined,
  PlusOutlined,
  SafetyOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Empty,
  Input,
  MenuProps,
  message,
  PaginationProps,
  Radio,
  Row,
  List,
  Typography,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import "./IdeaNoteManagementComponent.scss";
import "../../../Styles/common.table.scss";
import { RoleIcon } from "../../Common/RoleIcon/role.icon";
import {
  CertBGColor,
  CertColor,
  DevBGColor,
  DevColor,
  GovBGColor,
  GovColor,
  MinBGColor,
  MinColor,
} from "../../../Styles/role.color.constants";
import { addCommSep } from "../../../Definitions/Definitions/programme.definitions";
import { IdeaNoteTableDataType } from "../../../Definitions/Definitions/IdeaNoteManagement.definitions";
import { Action } from "../../../Definitions/Enums/action.enum";
import { Company } from "../../../Definitions/Entities/company";
import { IdeaNoteManagementColumns } from "../../../Definitions/Enums/ideanote.management.columns.enum";
import { ProfileIcon } from "../../Common/ProfileIcon/profile.icon";
import { CompanyRole } from "../../../Definitions/Enums/company.role.enum";
import { CompanyState } from "../../../Definitions";
import { IdeaNoteStatus } from "../../Common/IdeaNoteStatus/ideanoteStatus";
import { useConnection } from "../../../Context";
import * as Icon from "react-bootstrap-icons";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const { Search } = Input;

export const IdeaNoteManagementComponent = (props: any) => {
  const {
    t,
    useAbilityContext,
    visibleColumns,
    onNavigateToIdeaNoteDetail,
    onClickAddCompany,
  } = props;
  const [totalIdeaNote, setTotalIdeaNote] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IdeaNoteTableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchByTermOrganisation] = useState<any>("name");
  const [searchValueOrganisations, setSearchValueOrganisations] =
    useState<string>("");
  const [networksearchOrganisations, setNetworkSearchOrganisations] =
    useState<string>("");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [filterByOrganisationType, setFilterByOrganisationType] =
    useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");
  const [dataQuery, setDataQuery] = useState<any>();
  const ability = useAbilityContext();
  const { post } = useConnection();

  document.addEventListener("mousedown", (event: any) => {
    const organisationFilterArea1 = document.querySelector(".filter-bar");
    const organisationFilterArea2 = document.querySelector(".filter-dropdown");

    if (organisationFilterArea1 !== null && organisationFilterArea2 !== null) {
      if (
        organisationFilterArea1.contains(event.target) ||
        organisationFilterArea2.contains(event.target)
      ) {
        setFilterVisible(true);
      } else {
        setFilterVisible(false);
      }
    }
  });

  const getCompanyBgColor = (item: string) => {
    return DevBGColor;
  };

  const getCompanyRoleComponent = (item: string) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {item === CompanyRole.GOVERNMENT ? (
          <RoleIcon icon={<BankOutlined />} bg={GovBGColor} color={GovColor} />
        ) : item === CompanyRole.CERTIFIER ? (
          <RoleIcon
            icon={<SafetyOutlined />}
            bg={CertBGColor}
            color={CertColor}
          />
        ) : item === CompanyRole.MINISTRY ? (
          <RoleIcon icon={<AuditOutlined />} bg={MinBGColor} color={MinColor} />
        ) : (
          <RoleIcon
            icon={<ExperimentOutlined />}
            bg={DevBGColor}
            color={DevColor}
          />
        )}
        {item === CompanyRole.PROGRAMME_DEVELOPER ? (
          <div>{t("company:developer")}</div>
        ) : (
          <div>{item}</div>
        )}
      </div>
    );
  };

  const getIdeaNoteStateComponent = (item: string) => {
    return (
      <div style={{ display: "flex", alignItems: "left" }}>
        <IdeaNoteStatus t={t} IdeaNoteStatus={item}></IdeaNoteStatus>
      </div>
    );
  };

  const handleFilterVisibleChange = () => {
    setFilterVisible(true);
  };

  const actionMenu = (record: any) => {
    return (
      <List
        className="action-menu"
        size="small"
        dataSource={[
          {
            text: t("company:view"),
            icon: <Icon.InfoCircle />,
            click: () => {
              onNavigateToIdeaNoteDetail(record);
            },
          },
        ]}
        renderItem={(item: any) => (
          <List.Item onClick={item.click}>
            <Typography.Text className="action-icon color-primary">
              {item.icon}
            </Typography.Text>
            <span>{item.text}</span>
          </List.Item>
        )}
      />
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: IdeaNoteManagementColumns.logo,
      width: "20px",
      align: "left" as const,
      render: (item: any, itemObj: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <ProfileIcon
              icon={itemObj.logo}
              bg={getCompanyBgColor(itemObj.denomination)}
              name={itemObj.denomination}
            />
          </div>
        );
      },
    },
    {
      title: "SOUMISSIONNAIRE",
      dataIndex: "denomination",
      key: IdeaNoteManagementColumns.denomination,
      sorter: true,
      align: "left" as const,
      render: (item: any, itemObj: any) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="clickable"
          >
            <div style={{ fontWeight: 600 }}>{item}</div>
          </div>
        );
      },
      onCell: (record: any, rowIndex: any) => {
        return {
          onClick: (ev: any) => {
            onNavigateToIdeaNoteDetail(record);
          },
        };
      },
    },
    {
      title: "ID NOTE D'IDEE",
      dataIndex: "ref_note_idee",
      key: IdeaNoteManagementColumns.ref_note_idee,
      sorter: true,
      align: "left" as const,
      render: (item: any) => {
        return item ? item : "-";
      },
    },

    {
      title: "DATE DE DEPOT",
      dataIndex: "date_soumission",
      key: IdeaNoteManagementColumns.date_soumission,
      sorter: true,
      align: "left" as const,
      render: (item: any) => {
        return item ? item : "-";
      },
    },
    {
      title: "STATUT",
      dataIndex: "Statut",
      key: IdeaNoteManagementColumns.Statut,
      sorter: true,
      align: "left" as const,
      render: (item: any) => {
        return getIdeaNoteStateComponent(item);
      },
    },
    {
      title: t(""),
      width: 6,
      align: "right" as const,
      key: IdeaNoteManagementColumns.action,
      render: (_: any, record: any) => {
        const menu = actionMenu(record);
        return (
          menu && (
            <Popover placement="bottomRight" content={menu} trigger="click">
              <EllipsisOutlined
                rotate={90}
                style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}
              />
            </Popover>
          )
        );
      },
    },
  ].filter((column) => visibleColumns.includes(column.key));

  const filterOr = () => {
    if (
      searchByTermOrganisation !== null &&
      searchByTermOrganisation !== "" &&
      networksearchOrganisations !== null &&
      networksearchOrganisations !== "" &&
      filterByOrganisationType === "All"
    ) {
      return [
        {
          key: searchByTermOrganisation,
          operation: "like",
          value: "%" + networksearchOrganisations + "%",
        },
      ];
    } else return undefined;
  };

  const filterAnd = () => {
    if (
      searchByTermOrganisation !== null &&
      searchByTermOrganisation !== "" &&
      networksearchOrganisations !== null &&
      networksearchOrganisations !== "" &&
      filterByOrganisationType !== "All"
    ) {
      return [
        {
          key: searchByTermOrganisation,
          operation: "like",
          value: "%" + networksearchOrganisations + "%",
        },
        {
          key: "companyRole",
          operation: "=",
          value: filterByOrganisationType,
        },
      ];
    } else if (filterByOrganisationType !== "All") {
      return [
        {
          key: "companyRole",
          operation: "=",
          value: filterByOrganisationType,
        },
      ];
    } else return undefined;
  };

  const sort = () => {
    if (sortOrder !== "" && sortField !== "") {
      return {
        key: sortField,
        order: sortOrder,
        nullFirst: false,
      };
    } else
      return {
        key: "companyId",
        order: "DESC",
      };
  };

  const getAllIdeaNoteParams = () => {
    return {
      page: currentPage,
      limit: pageSize,
    };
  };

  const getAllCompany = async () => {
    setLoading(true);
    try {
      const headers: any = {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYzMzkzODcsImV4cCI6NDg2OTkzOTM4N30.778fs30YX0hossKnCacm7bPYiJsYtWja7wL_NX_ttrc`,
      };

      const method: string = "post";

      const url: string =
        "http://localhost:3005/users/apiv1/liste_all_note_formated";

      const data: any = {
        page: currentPage,
        limit: pageSize,
      };

      axios({
        method,
        url,
        data, // Correction ici
        headers,
      }).then((response: AxiosResponse) => {
        if (response && response.data) {
          const availableIdeaNote = response.data;
          setTableData(availableIdeaNote);
          setTotalIdeaNote(response.data.total); // Correction de l'accès aux données
        }
      });

      setLoading(false);
    } catch (error: any) {
      message.open({
        type: "error",
        content: error.message,
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  const downloadCompanyData = async () => {
    setLoading(true);

    try {
      const response: any = await post("national/organisation/download", {
        filterAnd: dataQuery.filterAnd,
        filterOr:
          dataQuery.filterOr?.length > 0 ? dataQuery.filterOr : undefined,
        sort: dataQuery.sort,
      });

      if (response && response.data) {
        const url = response.data.url;
        const a = document.createElement("a");
        a.href = url;
        a.download = response.data.csvFile; // Specify the filename for the downloaded file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up the created <a> element
        window.URL.revokeObjectURL(url);
      }
      setLoading(false);
    } catch (error: any) {
      console.log("Error in exporting organisations", error);
      message.open({
        type: "error",
        content: error.message,
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompany();
  }, [
    currentPage,
    pageSize,
    searchByTermOrganisation,
    networksearchOrganisations,
    filterByOrganisationType,
    sortField,
    sortOrder,
  ]);

  const onChange: PaginationProps["onChange"] = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const onFilterOrganisationType = (checkedValue: any) => {
    setCurrentPage(1);
    setFilterByOrganisationType(checkedValue?.target?.value);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      title: "Filter by",
      label: (
        <div className="filter-menu-item">
          <div className="filter-title">{t("company:filterByOrgType")}</div>
          <Radio.Group
            onChange={onFilterOrganisationType}
            value={filterByOrganisationType}
          >
            <Space direction="vertical">
              <Radio value="All">{t("company:all")}</Radio>
              <Radio value="Government">{t("company:gov")}</Radio>
              <Radio value="Ministry">{t("company:min")}</Radio>
              <Radio value="ProgrammeDeveloper">{t("company:developer")}</Radio>
              <Radio value="Certifier">{t("company:certifier")}</Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
    },
  ];

  const onSearch = () => {
    setCurrentPage(1);
    setNetworkSearchOrganisations(searchValueOrganisations);
  };

  const handleTableChange = (val: any, sorter: any) => {
    if (sorter.order === "ascend") {
      setSortOrder("ASC");
    } else if (sorter.order === "descend") {
      setSortOrder("DESC");
    } else if (sorter.order === undefined) {
      setSortOrder("");
    }
    if (sorter.columnKey !== undefined) {
      if (sorter.columnKey === "company") {
        setSortField("company.name");
      } else {
        setSortField(sorter.field);
      }
    } else {
      setSortField("companyId");
      setSortOrder("DESC");
    }
    // setCurrentPage(1);
  };

  return (
    <div className="content-container">
      <div className="title-bar">
        <div className="body-title">Voir les notes d'idées</div>
      </div>
      <div className="content-card">
        <Row>
          <Col span={24}>
            <div className="userManagement-table-container">
              <Table
                dataSource={tableData}
                columns={columns}
                className="common-table-class"
                loading={loading}
                rowClassName={(record) =>
                  parseInt(record.state as string) === 0 ? "table-row-gray" : ""
                }
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalIdeaNote,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  onChange: onChange,
                }}
                onChange={(val: any, filter: any, sorter: any) =>
                  handleTableChange(val, sorter)
                }
                // scroll={{ x: 1500 }}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={tableData.length === 0 ? "No data" : null}
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
