import { BookOutlined,UploadOutlined, UserOutlined,FileOutlined,FileAddOutlined,CheckCircleOutlined} from "@ant-design/icons";
import { Col,Button, Card, Skeleton,Tooltip, Row } from "antd";
import React from "react";
import { CompanyRole, addCommSep, CarbonSystemType, SectoralScope, GovDepartment } from "../../../Definitions";
import CompanyRoleIcon from "../../Common/CompanyRoleIcon/companyRoleIcon";
import "./IdeaNoteDetail2Component.scss";

export const IdeaNoteDetail2Component = (props: any) => {
  const {
    t,
    IdeaNoteDetail,
    lettre_non_objection,
    lettre_eligibilite,
    lettre_eligibilite_signe,
    lettre_non_objection_signe,
    onUploadModalConfirm,
    statusnoteidee,
    isLoading,
    systemType,
  } = props;

  const getEnumKeysFromValues = (values: string[]): string[] => {
    const enumKeys: string[] = [];
    for (const key in SectoralScope) {
      if (values.includes(SectoralScope[key as keyof typeof SectoralScope])) {
        enumKeys.push(key);
      }
    }

    return enumKeys;
  };

  return (
    <Card className="card-container">
      <div className="info-view">
        <div className="title">
          <span className="title-icon">
          <BookOutlined />
          </span>
          <span className="title-text">
           Note d'idée
          </span>
        </div>
        <Skeleton loading={false} active>
          <Row className="field">
            <Col span={12} className="field-key">
           Références : 
            </Col>
            <Col span={12} className="field-value">
              {IdeaNoteDetail[0]?.ref_note_idee ? IdeaNoteDetail[0]?.ref_note_idee : "-"}
            </Col>
          </Row>
       
          <Row className="field">
            <Col span={12} className="field-key">
            <span className="title-icon">
             </span>
              Document de note d'idée : 
            </Col>
            <Col span={12} className="field-value nextline-overflow">      
                   <a
                    href={ IdeaNoteDetail[0]?.note_idee ?  IdeaNoteDetail[0]?.note_idee : "-"}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <FileOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
            </Col>
          </Row>
          <Row className="field">
            <Col span={12} className="field-key">
            <span className="title-icon">
             </span> Document de conformité : 
            </Col>
            <Col span={12} className="field-value nextline-overflow">
                 <a
                    href={ IdeaNoteDetail[0]?.document_conformite ?  IdeaNoteDetail[0]?.document_conformite : "-"}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <FileOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
            
            </Col>
          </Row>
        
          <Row className="field">
            <Col span={12} className="field-key">
            Date de dépôt : 
            </Col>
            <Col span={12} className="field-value nextline-overflow">
            {IdeaNoteDetail[0]?.date_creation ? IdeaNoteDetail[0]?.date_creation : "-"}
            </Col>
          </Row>
          <Row className="field">
            <Col span={12} className="field-key">
              Statut
            </Col>
            <Col span={12} className="field-value">
            {statusnoteidee =="en_attente" ? "En attente": "Validée"}
            </Col>
          </Row>
          {lettre_eligibilite_signe !== "" ? (
            <Row className="field" key="Eligibility Document">
              <Col span={18} className="field-key">
              <div className="label-container">
              <div className="label-uploaded">Lettre d'Eligibilité</div>
                <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
              </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={lettre_eligibilite_signe}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <BookOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
                </div>
              </Col>
             
            </Row>
          ):(
            <div>
            {lettre_eligibilite !== "" && (
              <Row className="field" key="Eligibility Document">
              <Col span={18} className="field-key">
                <div className="label-uploaded">Lettre d'Eligibilité</div>
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={lettre_eligibilite}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <BookOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
                </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <FileAddOutlined
                    onClick={() => {
                      onUploadModalConfirm();
                    }}
                    className="common-progress-icon"
                    style={{ 
                      color: "#976ED7",
                      paddingTop: "3px",
                      margin: "0px 0px 1.5px 0px" 
                    }}
                  />
                </div>
              </Col>
              </Row>
              )}
            </div>
          )}

           {lettre_non_objection_signe !== "" ? (
            <Row className="field" key="Eligibility Document">
              <Col span={18} className="field-key">
              <div className="label-container">
              <div className="label-uploaded">Lettre de Non objection</div>
                <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
              </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={lettre_non_objection_signe}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <BookOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
                </div>
              </Col>
             
            </Row>
          ):(
            <div>
            {lettre_non_objection !== "" && (
              <Row className="field" key="Eligibility Document">
              <Col span={18} className="field-key">
                <div className="label-uploaded">Lettre de Non objection</div>
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={lettre_non_objection}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <BookOutlined
                      className="common-progress-icon"
                      style={{ color: "#3F3A47" }}
                    />
                  </a>
                </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <FileAddOutlined
                    onClick={() => {
                      onUploadModalConfirm();
                    }}
                    className="common-progress-icon"
                    style={{ 
                      color: "#976ED7",
                      paddingTop: "3px",
                      margin: "0px 0px 1.5px 0px" 
                    }}
                  />
                </div>
              </Col>
              </Row>
              )}
            </div>
          )}

        </Skeleton>
      </div>
    </Card>
  )
}