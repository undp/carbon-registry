import {
  BankOutlined,
  UserOutlined,
  FileAddOutlined,
  CheckCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, message, Row, Tooltip, Skeleton } from "antd";
import { plainToClass } from "class-transformer";
import React, { useEffect, useState } from "react";
import { Action } from "../../../Definitions/Enums/action.enum";
import { Company } from "../../../Definitions/Entities/company";
import CompanyRoleIcon from "../../Common/CompanyRoleIcon/companyRoleIcon";
import UserActionConfirmationModel from "../../Common/Models/userActionConfirmationModel";
import "./IdeaNoteDetailComponent.scss";
import * as Icon from "react-bootstrap-icons";
import { IdeaNoteStatus } from "../../Common/IdeaNoteStatus/ideanoteStatus";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  addCommSep,
  CarbonSystemType,
  CompanyState,
  GovDepartment,
  SectoralScope,
} from "../../../Definitions";
import { CompanyRole } from "../../../Definitions/Enums/company.role.enum";
import { useConnection } from "../../../Context";
import { IdeaNoteDetail2Component } from "../IdeaNoteDetail2/IdeaNoteDetail2Component";

export const IdeaNoteDetailComponent = (props: any) => {
  const {
    t,
    useAbilityContext,
    useLocation,
    onNavigateToCompanyManagement,
    systemType,
  } = props;
  const { get, put, post } = useConnection();
  const [IdeaNoteDetail, setIdeaNoteDetails] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(undefined);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [actionInfo, setActionInfo] = useState<any>({});
  const [openDeauthorisationModal, setOpenDeauthorisationModal] =
    useState(false);
  const [openReactivateModal, setOpenReactivateModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openUploadModalConfirm, setOpenUploadModalConfirm] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [lettre_eligibilite, setlettre_eligibilite] = useState<any>("");
  const [lettre_non_objection, setlettre_non_objection] = useState("");
  const [lettre_eligibilite_signe, setlettre_eligibilite_signe] =
    useState<any>("");
  const [lettre_non_objection_signe, setlettre_non_objection_signe] =
    useState("");
  const [statusnoteidee, setstatusnoteidee] = useState("");
  const [type_of_letter, settype_of_letter] = useState("");
  const [userRole, setUserRole] = useState<any>("");
  const [companyRole, setCompanyRole] = useState<any>("");
  const ability = useAbilityContext();

  const handleFileChange = (event: any) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
  };

  const getIdeaNoteDetails = async (ref_note_idee: string) => {
    setIsLoading(true);
    try {
      console.log(ref_note_idee);
      const headers: any = {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYzMzkzODcsImV4cCI6NDg2OTkzOTM4N30.778fs30YX0hossKnCacm7bPYiJsYtWja7wL_NX_ttrc`,
      };

      const method: string = "post";

      const url: string =
        "http://localhost:3005/users/apiv1/listNote_idee_by_ref_formate";

      const data: any = {
        Ref_note_idee: ref_note_idee,
      };

      axios({
        method,
        url,
        data, // Correction ici
        headers,
      }).then((response: AxiosResponse) => {
        if (response && response.data) {
          console.log(response.data);
          console.log(ref_note_idee);

          const availableIdeaNote = response.data;
          setIdeaNoteDetails(availableIdeaNote);
          setstatusnoteidee(availableIdeaNote[0].statut);
          // Correction de l'accès aux données
          console.log("Statut: " + statusnoteidee);
        }
      });

      setIsLoading(false);
    } catch (error: any) {
      message.open({
        type: "error",
        content: error.message,
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      setIsLoading(false);
    }
  };

  const getUserDetails = async (companyId: string) => {
    setIsLoading(true);
    try {
      const response: any = await post("national/user/query", {
        page: 1,
        size: 10,
        filterAnd: [
          {
            key: "companyId",
            operation: "=",
            value: companyId,
          },
          {
            key: "isPending",
            operation: "=",
            value: true,
          },
        ],
      });
      if (response && response.data) {
        setUserDetails(response.data[0]);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("Error in getting users", error);
      setIsLoading(false);
    }
  };

  // Generer une lettre d'eligibilité
  const generer_une_lettre_eligibilite = async (note_idee_Id: string) => {
    setlettre_eligibilite(
      "http://localhost:3000/documents/METHODOLOGY_DOCUMENT_020_V1.pdf"
    );
  };

  // Generer une lettre de non objection

  /*const generer_une_lettre_non_objection = async (note_idee_Id: string) => {

        setlettre_non_objection('http://localhost:3000/documents/METHODOLOGY_DOCUMENT_020_V1.pdf');

  }

*/

  useEffect(() => {
    if (!state) {
      onNavigateToCompanyManagement();
    } else {
      getIdeaNoteDetails(state.record.ref_note_idee);
      getletter_note(state.record.ref_note_idee);
      //onGetNoteIdee('test1','test2','fr');
    }
  }, []);

  const onDeauthoriseOrgConfirmed = async (remarks: string) => {
    try {
      setIsLoading(true);
      const response: any = await put(
        `national/organisation/suspend?id=${IdeaNoteDetail.companyId}`,
        {
          remarks: remarks,
        }
      );
      setOpenDeauthorisationModal(false);
      message.open({
        type: "success",
        content: t("companyProfile:deauthorisationSuccess"),
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      getIdeaNoteDetails(
        IdeaNoteDetail[0]?.note_idee ? IdeaNoteDetail[0]?.note_idee : "-"
      );
    } catch (exception: any) {
      setErrorMsg(exception.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onReactivateOrgConfirmed = async (remarks: string) => {
    try {
      setIsLoading(true);
      const response: any = await put(
        `national/organisation/activate?id=${IdeaNoteDetail.companyId}`,
        {
          remarks: remarks,
        }
      );
      setOpenReactivateModal(false);
      message.open({
        type: "success",
        content: t("companyProfile:reactivationSuccess"),
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      getIdeaNoteDetails(
        IdeaNoteDetail[0]?.note_idee ? IdeaNoteDetail[0]?.note_idee : "-"
      );
    } catch (exception: any) {
      setErrorMsg(exception.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onApproveOrgConfirmed = async (remarks: string) => {
    // console.log("JE SUIS ICI POUR TEST");
    setIsLoading(true);

    //Demander de generer un document
    let type_de_lettre = "";
    if (type_of_letter != "reject") {
      type_de_lettre = "";
      if (type_of_letter == "letter_of_non_objection") {
        type_de_lettre = "objection_letter";
      } else if (type_of_letter == "letter_of_eligibility") {
        type_de_lettre = "eligibilite_letter";
      }

      try {
        const headers: any = {
          authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTcxMjg0MjEsImV4cCI6MTcyNzQ5NjQyMX0.fuU7TGjn2BIVkjM1puGCmwCS-CDkGXHDTfZxJno5kzQ`,
        };

        const method: string = "post";

        const url: string =
          "https://docregister.ci.skyvisionafrica.com/api/v1/doc/create_idea";

        const data: any = {
          IdIdea: IdeaNoteDetail[0]?.ref_note_idee
            ? IdeaNoteDetail[0]?.ref_note_idee
            : "0",
          Type: type_de_lettre,
          Lang: "fr",
        };

        axios({
          method,
          url,
          data, // Correction ici
          headers,
        }).then((response: AxiosResponse) => {
          if (response && response.data) {
            console.log(response.data);

            //setstatusnoteidee('valide');
            if (type_of_letter == "letter_of_non_objection") {
              setlettre_non_objection(response.data.data.Url);
            } else if (type_of_letter == "letter_of_eligibility") {
              setlettre_eligibilite(response.data.data.Url);
            }
          }
        });

        setOpenApproveModal(false);
        message.open({
          type: "success",
          content: "Lettre non signée générée avec succes",
          duration: 3,
          style: { textAlign: "right", marginRight: 15, marginTop: 10 },
        });
        //  getIdeaNoteDetails(IdeaNoteDetail.companyId);
        //   getUserDetails(IdeaNoteDetail.companyId);
      } catch (exception: any) {
        setErrorMsg(exception.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      //processus à ajouter avec edition du status de la note d'idée
    }
  };

  const getletter_note = (NoteId: any) => {
    try {
      const headers: any = {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTcxMjg0MjEsImV4cCI6MTcyNzQ5NjQyMX0.fuU7TGjn2BIVkjM1puGCmwCS-CDkGXHDTfZxJno5kzQ`,
      };

      const method: string = "post";

      const url: string =
        "https://docregister.ci.skyvisionafrica.com/api/v1/doc/read_global";

      const data: any = {
        Id: NoteId,
        Type: "Note",
      };

      axios({
        method,
        url,
        data, // Correction ici
        headers,
      }).then((response: AxiosResponse) => {
        if (response && response.data) {
          console.log(response.data);
          //Modifier l'url de la lettre d'approbation
          //setAuthorisationDocUrlsigne();
          if (response.data.data.objection_letter.exist == true) {
            if (response.data.data.objection_letter.signed == true) {
              setlettre_non_objection_signe(
                response.data.data.objection_letter.link
              );
              setstatusnoteidee("valide");
              settype_of_letter("letter_of_non_objection");
            } else {
              setlettre_non_objection(response.data.data.objection_letter.link);
              //setstatusnoteidee('valide');
              settype_of_letter("letter_of_non_objection");
            }
          }

          if (response.data.data.eligibilite_letter.exist == true) {
            if (response.data.data.eligibilite_letter.signed == true) {
              setlettre_eligibilite_signe(
                response.data.data.eligibilite_letter.link
              );
              setstatusnoteidee("valide");
              settype_of_letter("letter_of_eligibility");
            } else {
              setlettre_eligibilite(response.data.data.eligibilite_letter.link);
              settype_of_letter("letter_of_eligibility");
              // setstatusnoteidee('valide');
            }
          }
        }
      });
    } catch (error) {
      console.error("Error", error);
      message.open({
        type: "error",
        content: "Erreur de chargement",
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
    }
  };

  const onUploadLetter = async () => {
    console.log(selectedFile);

    if (!selectedFile) {
      message.open({
        type: "error",
        content: "Please select a file before uploading.",
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      return;
    }

    setIsLoading(true);

    let type_de_lettre = "";
    if (type_of_letter != "reject") {
      type_de_lettre = "";
      if (type_of_letter == "letter_of_non_objection") {
        type_de_lettre = "objection_letter";
      } else if (type_of_letter == "letter_of_eligibility") {
        type_de_lettre = "eligibilite_letter";
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("Type", type_de_lettre); // Replace with the actual type
      formData.append(
        "Id_pro_idea",
        IdeaNoteDetail[0]?.ref_note_idee
          ? IdeaNoteDetail[0]?.ref_note_idee
          : "0"
      ); // Replace with the actual ID

      const headers = {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTcxMjg0MjEsImV4cCI6MTcyNzQ5NjQyMX0.fuU7TGjn2BIVkjM1puGCmwCS-CDkGXHDTfZxJno5kzQ", // Replace with the actual token
      };

      try {
        const response = await axios.post(
          "https://docregister.ci.skyvisionafrica.com/api/v1/doc/add_doc_sign", // Replace with the actual URL
          formData,
          { headers }
        );

        if (response && response.data) {
          console.log(response.data);
          if (type_of_letter == "letter_of_non_objection") {
            setlettre_non_objection_signe(response.data.data.link);
          } else if (type_of_letter == "letter_of_eligibility") {
            setlettre_eligibilite_signe(response.data.data.link);
          }

          setstatusnoteidee("valide");

          const formData1 = new FormData();
          formData1.append("Statut", "valide"); // Replace with the actual type
          formData1.append("Note_ideeid", IdeaNoteDetail[0]?.id_note_idee); // Replace with the actual ID

          const headers: any = {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYzMzkzODcsImV4cCI6NDg2OTkzOTM4N30.778fs30YX0hossKnCacm7bPYiJsYtWja7wL_NX_ttrc`,
          };
          const response1 = await axios.post(
            "http://localhost:3005/users/apiv1/editNote_idee", // Replace with the actual URL
            formData1,
            { headers }
          );

          console.log("Note bien approuvée: " + response1);

          message.open({
            type: "success",
            content: "File uploaded successfully.",
            duration: 3,
            style: { textAlign: "right", marginRight: 15, marginTop: 10 },
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        message.open({
          type: "error",
          content: "Erreur  d'upload du fichier.",
          duration: 3,
          style: { textAlign: "right", marginRight: 15, marginTop: 10 },
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onApproveOrgCanceled = () => {
    setOpenApproveModal(false);
  };

  const onUploadModalConfirm = () => {
    setActionInfo({
      action: `Confirmer`,
      headerText: `Chargez votre lettre signée`,
      text: `${t("companyProfile:approveConfirmText")}`,
      type: "primary",
      icon: <Icon.ClipboardCheck />,
    });
    setErrorMsg("");
    setOpenUploadModalConfirm(true);
  };

  const onUploadModalCanceled = () => {
    setOpenUploadModalConfirm(false);
  };

  const onRejectOrgConfirmed = async (remarks: string) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("Statut", "refuse"); // Replace with the actual type
      formData.append("Note_ideeid", IdeaNoteDetail[0]?.id_note_idee); // Replace with the actual ID

      const headers: any = {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYzMzkzODcsImV4cCI6NDg2OTkzOTM4N30.778fs30YX0hossKnCacm7bPYiJsYtWja7wL_NX_ttrc`,
      };
      const response = await axios.post(
        "http://localhost:3005/users/apiv1/editNote_idee", // Replace with the actual URL
        formData,
        { headers }
      );
      setOpenRejectModal(false);
      console.log("Note bien refusée: " + response);

      message.open({
        type: "success",
        content: t("companyProfile:rejectedSuccessfully"),
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      getIdeaNoteDetails(
        IdeaNoteDetail[0]?.note_idee ? IdeaNoteDetail[0]?.note_idee : "-"
      );
    } catch (exception: any) {
      setErrorMsg(exception.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRejectOrgCanceled = () => {
    setOpenRejectModal(false);
  };

  const onDeauthoriseOrgCanceled = () => {
    setOpenDeauthorisationModal(false);
  };

  const onReactivateOrgCanceled = () => {
    setOpenReactivateModal(false);
  };

  const onDeauthoriseOrganisation = () => {
    setActionInfo({
      action: `${t("companyProfile:deauthorise")}`,
      headerText: `${t("companyProfile:deauthoriseConfirmHeaderText")}`,
      text: `${t("companyProfile:deauthoriseConfirmText")}`,
      type: "danger",
      icon: <Icon.BuildingDash />,
    });
    setErrorMsg("");
    setOpenDeauthorisationModal(true);
  };

  const onReActivateOrganisation = () => {
    setActionInfo({
      action: `${t("companyProfile:reActivate")}`,
      headerText: `${t("companyProfile:reActivateConfirmHeaderText")}`,
      text: `${t("companyProfile:reActivateConfirmText")}`,
      type: "primary",
      icon: <Icon.BuildingCheck />,
    });
    setErrorMsg("");
    setOpenReactivateModal(true);
  };

  const onGenerateLetterEligibility = () => {
    setActionInfo({
      action: `${t("companyProfile:approve")}`,
      headerText: `${t(
        "companyProfile:eligibility_letter_generator_confirm_text"
      )}`,
      text: `${t("companyProfile:approveConfirmText")}`,
      type: "primary",
      icon: <Icon.ClipboardCheck />,
    });
    setErrorMsg("");
    settype_of_letter("letter_of_eligibility");
    setOpenApproveModal(true);
  };

  const onGenerateLetterNonObjection = () => {
    setActionInfo({
      action: `${t("companyProfile:approve")}`,
      headerText: `${t(
        "companyProfile:nonobjection_letter_generator_confirm_text"
      )}`,
      text: `${t("companyProfile:approveConfirmText")}`,
      type: "primary",
      icon: <Icon.ClipboardCheck />,
    });
    setErrorMsg("");
    settype_of_letter("letter_of_non_objection");
    setOpenApproveModal(true);
  };

  const onRejectIdeaNote = () => {
    setActionInfo({
      action: `${t("companyProfile:reject")}`,
      headerText: `${t("companyProfile:rejectConfirmIdeaNoteText")}`,
      text: `${t("companyProfile:rejectConfirmText")}`,
      type: "danger",
      icon: <Icon.ClipboardX />,
    });
    setErrorMsg("");
    settype_of_letter("reject");
    setOpenRejectModal(true);
  };

  const onRejectOrganisation = () => {
    setActionInfo({
      action: `${t("companyProfile:reject")}`,
      headerText: `${t("companyProfile:rejectConfirmHeaderText")}`,
      text: `${t("companyProfile:rejectConfirmText")}`,
      type: "danger",
      icon: <Icon.ClipboardX />,
    });
    setErrorMsg("");
    setOpenRejectModal(true);
  };

  return (
    <div className="content-container company-profile">
      <div className="title-bar">
        <div>
          <div className="body-title">
            {" "}
            {t("companyProfile:IdeaNoteDetailTitle")}
          </div>
        </div>
        <div className="flex-display">
          {statusnoteidee == "en_attente" || statusnoteidee == "recours" ? (
            <Row justify="end">
              <Button
                className="mg-left-1 btn-danger mg-bottom-1"
                onClick={() => {
                  onRejectIdeaNote();
                }}
              >
                {t("companyProfile:reject")}
              </Button>
              <Button
                className="mg-left-1 mg-bottom-1"
                type="primary"
                onClick={() => {
                  onGenerateLetterEligibility();
                }}
              >
                {t("companyProfile:letter_eligibility")}
              </Button>
              <Button
                className="mg-left-1 mg-bottom-1"
                type="primary"
                onClick={() => {
                  onGenerateLetterNonObjection();
                }}
              >
                {t("companyProfile:letter_no_objection")}
              </Button>
            </Row>
          ) : (
            ""
          )}
        </div>
      </div>
      {!IdeaNoteDetail && (
        <div className="content-body">
          <Skeleton active loading={false}></Skeleton>
        </div>
      )}
      {IdeaNoteDetail && (
        <div className="content-body">
          <Row gutter={16}>
            <Col md={24} lg={8}>
              <Card className="card-container">
                <Skeleton loading={false} active>
                  <Row justify="center">
                    <img
                      className="profile-img"
                      alt="profile image"
                      src={IdeaNoteDetail[1]?.logo}
                    />
                  </Row>
                  <Row justify="center">
                    <div className="padding-top-1 company-name">
                      {IdeaNoteDetail[1]?.denomination}
                    </div>
                  </Row>
                  <Row justify="center">
                    <div className="padding-top-1 company-name">
                      {IdeaNoteDetail[1]?.site_web}
                    </div>
                  </Row>
                  <Row justify="center">
                    <div className="padding-top-1 company-name">
                      {IdeaNoteDetail[1]?.email_admin_organisation}
                    </div>
                  </Row>
                  <Row justify="center">
                    <div className="padding-top-1 company-name">
                      {IdeaNoteDetail[1]?.numero_tel_organisation}
                    </div>
                  </Row>
                  <Row className="field">
                    <Col span={12} className="field-key">
                      Documents:
                    </Col>
                    <Col span={12} className="field-value nextline-overflow">
                      <a
                        href={
                          IdeaNoteDetail[1]?.DFE ? IdeaNoteDetail[1]?.DFE : "-"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <FileOutlined
                          className="common-progress-icon"
                          style={{ color: "#3F3A47" }}
                        />
                      </a>
                      <a
                        href={
                          IdeaNoteDetail[1]?.RCCM
                            ? IdeaNoteDetail[1]?.RCCM
                            : "-"
                        }
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
                </Skeleton>
              </Card>
            </Col>
            {console.log(
              "Lettre non objection to be displayed:",
              lettre_non_objection
            )}
            <Col md={24} lg={16}>
              <IdeaNoteDetail2Component
                t={t}
                IdeaNoteDetail={IdeaNoteDetail}
                lettre_non_objection={lettre_non_objection}
                lettre_eligibilite={lettre_eligibilite}
                lettre_eligibilite_signe={lettre_eligibilite_signe}
                lettre_non_objection_signe={lettre_non_objection_signe}
                onUploadModalConfirm={onUploadModalConfirm}
                statusnoteidee={statusnoteidee}
                isLoading={isLoading}
                systemType={systemType}
              />
            </Col>
          </Row>
        </div>
      )}

      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onDeauthoriseOrgConfirmed}
        onActionCanceled={onDeauthoriseOrgCanceled}
        openModal={openDeauthorisationModal}
        errorMsg={errorMsg}
        loading={isLoading}
      />
      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onUploadLetter}
        onActionCanceled={onUploadModalCanceled}
        openModal={openUploadModalConfirm}
        uploadmodal={openUploadModalConfirm}
        onUploadLetter={onUploadLetter}
        handleFileChange={handleFileChange}
        errorMsg={errorMsg}
        loading={isLoading}
      />

      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onReactivateOrgConfirmed}
        onActionCanceled={onReactivateOrgCanceled}
        openModal={openReactivateModal}
        errorMsg={errorMsg}
        loading={isLoading}
      />

      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onApproveOrgConfirmed}
        onActionCanceled={onApproveOrgCanceled}
        openModal={openApproveModal}
        errorMsg={errorMsg}
        loading={isLoading}
      />

      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onRejectOrgConfirmed}
        onActionCanceled={onRejectOrgCanceled}
        openModal={openRejectModal}
        errorMsg={errorMsg}
        loading={isLoading}
      />
    </div>
  );
};
