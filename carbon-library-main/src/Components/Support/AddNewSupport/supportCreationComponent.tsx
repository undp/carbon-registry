import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  message,
} from "antd";
import "../supportComponent.scss";
import {
  ProgrammeT,
  addSpaces,
} from "../../../Definitions/Definitions/programme.definitions";
import { Instrument } from "../../../Definitions/Enums/instrument.enum";
import { Loading } from "../../Common/Loading/loading";
import React from "react";
import {
  InvestmentCreationType,
  InvestmentLevel,
  InvestmentStream,
  InvestmentType,
} from "../../../Definitions/Enums/investment.enum";
import { ESGType } from "../../../Definitions/Enums/eSGType.enum";
import { CompanyRole } from "../../../Definitions/Enums/company.role.enum";
import { useConnection, useUserContext } from "../../../Context";

export const SupportCreationComponent = (props: any) => {
  const {
    t,
    useLocation,
    onNavigateToProgrammeManagementView,
    onNavigateToProgrammeView,
  } = props;

  const { state } = useLocation();
  const [data, setData] = useState<ProgrammeT>();
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const { post } = useConnection();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [currentPercTotal, setCurrentPercTotal] = useState<number>(0);
  const [organisationsList, setOrganisationList] = useState<any[]>([]);
  const [instrument, setInstrument] = useState<string[]>([]);
  const [stepOneData, setStepOneData] = useState<any>();
  const { userInfoState } = useUserContext();

  const instrumentOptions = Object.keys(Instrument).map((k, index) => ({
    label: addSpaces(Object.values(Instrument)[index]),
    value: Object.values(Instrument)[index],
  }));

  const onInstrumentChange = (value: any) => {
    setInstrument(value);
  };

  const onPercentageChange = (value: any) => {
    setCurrentPercTotal(
      formTwo.getFieldValue("percentage").reduce((a: any, b: any) => a + b, 0)
    );
  };

  const getOrganisationsDetails = async () => {
    setLoadingList(true);
    try {
      let filterAnd: any[] = [];
      filterAnd = [
        {
          key: "companyRole",
          operation: "=",
          value: CompanyRole.PROGRAMME_DEVELOPER.toString(),
        },
      ];

      if (userInfoState?.companyRole === CompanyRole.PROGRAMME_DEVELOPER) {
        filterAnd.push({
          key: "companyId",
          operation: "!=",
          value: userInfoState?.companyId,
        });
      }
      const response = await post("national/organisation/queryNames", {
        page: 1,
        size: 100,
        filterAnd: filterAnd,
      });
      if (response.data) {
        setOrganisationList(response?.data);
      }
    } catch (error: any) {
      console.log("Error in getting organisation list", error);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    getOrganisationsDetails();
  }, []);

  // const companyName: any = {};
  // for (const company of data!?.company) {
  //   companyName[company.companyId] = company;
  // }
  // if (!data!.proponentPercentage) {
  //   data.proponentPercentage = [100];
  // }

  const nextOne = (val: any) => {
    setCurrent(current + 1);
    setStepOneData(val);
  };

  const prevOne = () => {
    setCurrent(current - 1);
  };

  // const submitInvestment = async (val: any) => {
  //   console.log(val);
  //   console.log(stepOneData);

  //   setLoading(true);

  //   const payload = stepOneData;
  //   payload.programmeId = data.programmeId;
  //   payload.amount = parseFloat(payload.amount);

  //   if (payload.interestRate) {
  //     payload.interestRate = parseFloat(payload.interestRate);
  //   }
  //   if (payload.paymentPerMetric) {
  //     payload.paymentPerMetric = parseFloat(payload.paymentPerMetric);
  //   }

  //   payload.fromCompanyIds = data.companyId.map((e) => Number(e));
  //   payload.percentage = val.percentage;
  //   payload.toCompanyId = Number(payload.toCompanyId);
  //   try {
  //     const response: any = await post(
  //       "national/programme/addInvestment",
  //       payload
  //     );
  //     console.log("investment creation -> ", response);
  //     if (response?.statusText === "SUCCESS") {
  //       message.open({
  //         type: "success",
  //         content: t("programme:investmentCreationSuccess"),
  //         duration: 4,
  //         style: { textAlign: "right", marginRight: 15, marginTop: 10 },
  //       });
  //     }
  //     onNavigateToProgrammeView();
  //   } catch (error: any) {
  //     console.log("Error in investment creation - ", error);
  //     message.open({
  //       type: "error",
  //       content: error?.message,
  //       duration: 4,
  //       style: { textAlign: "right", marginRight: 15, marginTop: 10 },
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deselectOnClick = (e: any, fieldName: string) => {
    const { value } = e.target;
    if (value === formOne.getFieldValue(fieldName)) {
      console.log("double clicked button", value);
      formOne.setFieldValue(fieldName, null);
    }
  };

  return (
    <div className="add-programme-main-container">
      <div className="title-container">
        <div className="main">{t("programme:addSupport")}</div>
        <div className="sub">{t("programme:addSupportSub")}</div>
      </div>
      <div className="adding-section">
        <div className="form-section">
          <Steps
            progressDot
            direction="vertical"
            current={current}
            items={[
              {
                title: (
                  <div className="step-title-container">
                    <div className="step-count">01</div>
                    <div className="title">
                      {t("programme:programmeFinancingInvested")}
                    </div>
                  </div>
                ),
                description: current === 0 && (
                  <div className="investment-sought-form-container">
                    <div className="investment-sought-form">
                      <Form
                        labelCol={{ span: 20 }}
                        wrapperCol={{ span: 24 }}
                        name="investment-sought"
                        className="investment-sought-form"
                        layout="vertical"
                        requiredMark={true}
                        form={formOne}
                        onFinish={nextOne}
                      >
                        <Row className="row" gutter={[16, 16]}>
                          <Col xl={12} md={24}>
                            <div className="details-part-one">
                              <Form.Item
                                label={t("programme:investorName")}
                                name="toCompanyId"
                                wrapperCol={{ span: 24 }}
                                className="organisation"
                                rules={[
                                  {
                                    required: true,
                                    message: `${t(
                                      "programme:investorName"
                                    )} ${t("isRequired")}`,
                                  },
                                ]}
                              >
                                <Select size="large" loading={loadingList}>
                                  {organisationsList.map((organisation) => (
                                    <Select.Option
                                      key={organisation.companyId}
                                      value={organisation.companyId}
                                    >
                                      {organisation.name}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                          </Col>
                          <Col xl={12} md={24}>
                            <div className="details-part-two">
                              <Form.Item
                                label={t("programme:amountInvested")}
                                name="amount"
                                rules={[
                                  {
                                    required: true,
                                    message: "",
                                  },
                                  {
                                    validator: async (rule, value) => {
                                      if (
                                        String(value).trim() === "" ||
                                        String(value).trim() === undefined ||
                                        value === null ||
                                        value === undefined
                                      ) {
                                        throw new Error(
                                          `${t("programme:amountInvested")} ${t(
                                            "isRequired"
                                          )}`
                                        );
                                      } else if (
                                        !isNaN(value) &&
                                        Number(value) > 0
                                      ) {
                                        return Promise.resolve();
                                      } else {
                                        throw new Error(
                                          `${t("programme:amountInvested")} ${t(
                                            "isInvalid"
                                          )}`
                                        );
                                      }
                                    },
                                  },
                                ]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </div>
                          </Col>
                        </Row>
                        <Row className="row" gutter={[16, 16]}>
                          <Col xl={24} md={24}>
                            <Form.Item
                              label={t("programme:instrument")}
                              name="instrument"
                              wrapperCol={{ span: 24 }}
                              className=""
                            >
                              <Checkbox.Group
                                options={instrumentOptions}
                                defaultValue={instrumentOptions.map(
                                  (e) => e.value
                                )}
                                onChange={onInstrumentChange}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        {instrument &&
                          instrument.indexOf(Instrument.LOAN) >= 0 && (
                            <Row className="row" gutter={[16, 16]}>
                              <Col xl={8} md={12}>
                                <div className="details-part-two">
                                  <Form.Item
                                    label={t("programme:interestRate")}
                                    name="interestRate"
                                    rules={[
                                      {
                                        required: true,
                                        message: "",
                                      },
                                      {
                                        validator: async (rule, value) => {
                                          if (
                                            String(value).trim() === "" ||
                                            String(value).trim() ===
                                            undefined ||
                                            value === null ||
                                            value === undefined
                                          ) {
                                            throw new Error(
                                              `${t(
                                                "programme:interestRate"
                                              )} ${t("isRequired")}`
                                            );
                                          } else if (!isNaN(value)) {
                                            return Promise.resolve();
                                          } else {
                                            throw new Error(
                                              `${t(
                                                "programme:interestRate"
                                              )} ${t("isInvalid")}`
                                            );
                                          }
                                        },
                                      },
                                    ]}
                                  >
                                    <Input size="large" />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          )}
                        {instrument &&
                          instrument.indexOf(Instrument.RESULT_BASED) >= 0 && (
                            <Row className="row" gutter={[16, 16]}>
                              <Col xl={12} md={24}>
                                <div className="details-part-two">
                                  <Form.Item
                                    label={t("programme:resultMetric")}
                                    name="resultMetric"
                                    rules={[
                                      {
                                        required: true,
                                        message: "",
                                      },
                                      {
                                        validator: async (rule, value) => {
                                          if (
                                            String(value).trim() === "" ||
                                            String(value).trim() ===
                                            undefined ||
                                            value === null ||
                                            value === undefined
                                          ) {
                                            throw new Error(
                                              `${t(
                                                "programme:resultMetric"
                                              )} ${t("isRequired")}`
                                            );
                                          }
                                        },
                                      },
                                    ]}
                                  >
                                    <Input size="large" />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xl={12} md={24}>
                                <div className="details-part-two">
                                  <Form.Item
                                    label={t("programme:paymentPerMetric")}
                                    name="paymentPerMetric"
                                    rules={[
                                      {
                                        required: true,
                                        message: "",
                                      },
                                      {
                                        validator: async (rule, value) => {
                                          if (
                                            String(value).trim() === "" ||
                                            String(value).trim() ===
                                            undefined ||
                                            value === null ||
                                            value === undefined
                                          ) {
                                            throw new Error(
                                              `${t(
                                                "programme:paymentPerMetric"
                                              )} ${t("isRequired")}`
                                            );
                                          } else if (!isNaN(value)) {
                                            return Promise.resolve();
                                          } else {
                                            throw new Error(
                                              `${t(
                                                "programme:paymentPerMetric"
                                              )} ${t("isInvalid")}`
                                            );
                                          }
                                        },
                                      },
                                    ]}
                                  >
                                    <Input size="large" />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          )}
                        {instrument &&
                          instrument.indexOf(Instrument.INKIND) >= 0 && (
                            <Row className="row" gutter={[16, 16]}>
                              <Col xl={12} md={24}>
                                <div className="details-part-two">
                                  <Form.Item
                                    label={t("programme:description")}
                                    name="description"
                                    rules={[
                                      {
                                        required: false,
                                        message: "",
                                      },
                                    ]}
                                  >
                                    <Input size="large" />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          )}
                        {instrument &&
                          instrument.indexOf(Instrument.OTHER) >= 0 && (
                            <Row className="row" gutter={[16, 16]}>
                              <Col xl={12} md={24}>
                                <div className="details-part-two">
                                  <Form.Item
                                    label={t("programme:comments")}
                                    name="comments"
                                    rules={[
                                      {
                                        required: true,
                                        message: "",
                                      },
                                      {
                                        validator: async (rule, value) => {
                                          if (
                                            String(value).trim() === "" ||
                                            String(value).trim() ===
                                            undefined ||
                                            value === null ||
                                            value === undefined
                                          ) {
                                            throw new Error(
                                              `${t("programme:comments")} ${t(
                                                "isRequired"
                                              )}`
                                            );
                                          }
                                        },
                                      },
                                    ]}
                                  >
                                    <Input size="large" />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          )}
                        <Row className="row" gutter={[4, 4]}>
                          <Col xl={8} md={12}>
                            <Form.Item
                              label={t("programme:type")}
                              wrapperCol={{ span: 13 }}
                              className="role-group"
                              name="type"
                              rules={[
                                {
                                  required: false,
                                },
                              ]}
                            >
                              <Radio.Group size="large">
                                {Object.values(InvestmentType).map(
                                  (k, index) => (
                                    <div className="condition-radio-container">
                                      <Radio.Button
                                        className="condition-radio"
                                        value={k}
                                        onClick={(e: any) =>
                                          deselectOnClick(e, "type")
                                        }
                                      >
                                        {t("programme:" + k)}
                                      </Radio.Button>
                                    </div>
                                  )
                                )}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col xl={8} md={12}>
                            <Form.Item
                              label={t("programme:level")}
                              wrapperCol={{ span: 13 }}
                              className="role-group"
                              name="level"
                              rules={[
                                {
                                  required: false,
                                },
                              ]}
                            >
                              <Radio.Group size="large">
                                {Object.values(InvestmentLevel).map(
                                  (k, index) => (
                                    <div className="condition-radio-container">
                                      <Radio.Button
                                        className="condition-radio"
                                        value={k}
                                        onClick={(e: any) =>
                                          deselectOnClick(e, "level")
                                        }
                                      >
                                        {t("programme:" + k)}
                                      </Radio.Button>
                                    </div>
                                  )
                                )}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col xl={8} md={12}>
                            <Form.Item
                              label={t("programme:stream")}
                              wrapperCol={{ span: 13 }}
                              className="role-group"
                              name="stream"
                              rules={[
                                {
                                  required: false,
                                },
                              ]}
                            >
                              <Radio.Group size="large">
                                {Object.values(InvestmentStream).map(
                                  (k, index) => (
                                    <div className="condition-radio-container">
                                      <Radio.Button
                                        className="condition-radio"
                                        value={k}
                                        onClick={(e: any) =>
                                          deselectOnClick(e, "stream")
                                        }
                                      >
                                        {t("programme:" + k)}
                                      </Radio.Button>
                                    </div>
                                  )
                                )}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row className="row" gutter={[16, 16]}>
                          <Col xl={12} md={24}>
                            <Form.Item
                              label={t("programme:esgType")}
                              name="esgClassification"
                            >
                              <Select size="large">
                                {Object.values(ESGType).map((esg: any) => (
                                  <Select.Option value={esg}>
                                    {esg}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Form.Item>
                          <div className="steps-actions">
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                              onSubmit={nextOne}
                            >
                              {t("programme:next")}
                            </Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                ),
              },
              {
                title: (
                  <div className="step-title-container">
                    <div className="step-count">02</div>
                    <div className="title">{t("programme:ownership")}</div>
                  </div>
                ),
                description: current === 1 && (
                  <div>
                    <div className="programme-sought-form-container ownership-container">
                      {/* <div className="programme-sought-form">
                        <Form
                          labelCol={{ span: 20 }}
                          wrapperCol={{ span: 24 }}
                          form={formTwo}
                          name="investment-sought"
                          className="investment-sought-form"
                          layout="vertical"
                          requiredMark={true}
                          onChange={onPercentageChange}
                          onFinish={() => { }}
                        >
                          {data?.companyId?.map((companyId, index) => {
                            return (
                              <Row className="row" gutter={[16, 16]}>
                                <Col xl={8} md={15}>
                                  <div className="label">
                                    {companyName[companyId].name}
                                    <span className="required-mark">*</span>
                                  </div>
                                </Col>
                                <Col xl={8} md={9}>
                                  <Form.Item
                                    className="inline"
                                    name={["percentage", index]}
                                    initialValue={0}
                                    rules={[
                                      {
                                        pattern: new RegExp(
                                          /^[+]?([.]\d+|\d+[.]?\d*)$/g
                                        ),
                                        message:
                                          "Percentage Should be a positive number",
                                      },
                                      {
                                        required: true,
                                        message: "Required field",
                                      },
                                      ({ getFieldValue }) => ({
                                        validator(rule, v) {
                                          if (
                                            getFieldValue([
                                              "percentage",
                                              index,
                                            ]) &&
                                            parseFloat(
                                              getFieldValue([
                                                "percentage",
                                                index,
                                              ])
                                            ) > data!.proponentPercentage[index]
                                          ) {
                                            // eslint-disable-next-line prefer-promise-reject-errors
                                            return Promise.reject(
                                              "Amount > Available"
                                            );
                                          }
                                          return Promise.resolve();
                                        },
                                      }),
                                    ]}
                                  >
                                    <InputNumber
                                      placeholder=""
                                      controls={false}
                                      // disabled={userInfoState?.companyId === Number(companyId)}
                                      onKeyPress={(event) => {
                                        if (!/[0-9\.]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                    />
                                  </Form.Item>
                                  <div className="inline separator">{"/"}</div>

                                  <Form.Item className="inline">
                                    <InputNumber
                                      placeholder={String(
                                        data?.proponentPercentage[index]
                                      )}
                                      disabled
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            );
                          })}
                          <Row className="row" gutter={[16, 16]}>
                            <Col xl={8} md={15}>
                              <div className="label">
                                {t("programme:total")}
                              </div>
                            </Col>
                            <Col xl={8} md={9}>
                              <Form.Item className="inline" name={["total"]}>
                                <InputNumber
                                  placeholder={currentPercTotal + ""}
                                  controls={false}
                                  disabled={true}
                                  onKeyPress={(event) => {
                                    if (!/[0-9\.]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                />
                              </Form.Item>
                              <div className="inline separator">{"/"}</div>

                              <Form.Item className="inline">
                                <InputNumber
                                  disabled={true}
                                  placeholder={"100"}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item>
                            <div className="steps-actions">
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                onSubmit={() => { }}
                              >
                                {t("programme:submit")}
                              </Button>
                              <Button
                                className="back-btn"
                                onClick={() => prevOne()}
                                loading={loading}
                              >
                                {t("programme:back")}
                              </Button>
                            </div>
                          </Form.Item>
                        </Form>
                      </div> */}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
