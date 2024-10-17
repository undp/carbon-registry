import { Col, Row, Skeleton, Tooltip, message } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import "./programmeDocuments.scss";
import {
  CheckCircleOutlined,
  DislikeOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import {
  CompanyRole,
  DocType,
  DocumentStatus,
  ProgrammeStageUnified,
  Role,
} from "../../../Definitions";
import {
  addCommSep
} from "../../../Definitions/Definitions/programme.definitions";
import { RejectDocumentationConfirmationModel } from "../Models/rejectDocumenConfirmationModel";
import { ApproveDocumentationConfirmationModel } from "../Models/approveDocumenConfirmationModel";
import { isValidateFileType } from "../../../Utils/DocumentValidator";
import UserActionConfirmationModel from "../../Common/Models/userActionConfirmationModel";
import * as Icon from "react-bootstrap-icons";
import {
  linkDocVisible,
  uploadDocUserPermission,
} from "../../../Utils/documentsPermission";
import { useConnection, useUserContext } from "../../../Context";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export interface ProgrammeDocumentsProps {
  data: any;
  title: any;
  icon: any;
  programmeId: any;
  programmeOwnerId: any[];
  getDocumentDetails: any;
  programme:any;
  authoriseDoc2Url:any;
  setauthoriseDoc2Url:any;
  onPopupAction:any;
  updateProgrammeData:any;
  getProgrammeById: any;
  ministryLevelPermission?: boolean;
  translator: any;
  methodologyDocumentUpdated: any;
  programmeStatus?: any;
}

export const ProgrammeDocuments: FC<ProgrammeDocumentsProps> = (
  props: ProgrammeDocumentsProps
) => {
  const {
    data,
    title,
    icon,
    programmeId,
    programmeOwnerId,
    getDocumentDetails,
    programme,
    authoriseDoc2Url,
    setauthoriseDoc2Url,
    onPopupAction,
    updateProgrammeData,
    getProgrammeById,
    ministryLevelPermission,
    translator,
    methodologyDocumentUpdated,
    programmeStatus,
  } = props;

  const t = translator.t;
  const { userInfoState } = useUserContext();
  const { delete: del, post } = useConnection();
  const { get, put} = useConnection();
  const fileInputRef: any = useRef(null);
  const fileInputRefMeth: any = useRef(null);
  const fileInputRefImpactAssessment: any = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [designDocUrl, setDesignDocUrl] = useState<any>("");
  const [approvalDocUrl, setapprovalDocUrl] = useState<any>("");
  const [approvalDocUrlsigne, setapprovalDocUrlsigne] = useState<any>("");
  const [noObjectionDocUrl, setNoObjectionDocUrl] = useState<any>("");
  const [authorisationDocUrlsigne, setAuthorisationDocUrlsigne] = useState<any>("");
  const [authorisationDocUrl, setAuthorisationDocUrl] = useState<any>("");
  const [methodologyDocUrl, setMethodologyDocUrl] = useState<any>("");
  const [designDocDate, setDesignDocDate] = useState<any>("");
  const [noObjectionDate, setNoObjectionDate] = useState<any>("");
  const [methodologyDate, setMethodologyDate] = useState<any>("");
  const [authorisationDocDate, setAuthorisationDocDate] = useState<any>("");
  const [designDocStatus, setDesignDocStatus] = useState<any>("");
  const [methodDocStatus, setMethodDocStatus] = useState<any>("");
  const [designDocId, setDesignDocId] = useState<any>("");
  const [designDocversion, setDesignDocversion] = useState<any>("");
  const [methDocId, setMethDocId] = useState<any>("");
  const [methDocversion, setMethDocversion] = useState<any>("");
  const [docData, setDocData] = useState<any[]>([]);
  const [list_certificateur, setlist_certificateur] = useState<any[]>([]);
  const [selectedCertifier, setSelectedCertifier] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openRejectDocConfirmationModal, setOpenRejectDocConfirmationModal] =
    useState(false);
  const [openApproveDocConfirmationModal, setOpenApproveDocConfirmationModal] =
    useState(false);
  const [actionInfo, setActionInfo] = useState<any>({});
  const [rejectDocData, setRejectDocData] = useState<any>({});
  const [openUploadModalConfirm, setOpenUploadModalConfirm] = useState(false);
  const [openUploadModalConfirmAuth, setOpenUploadModalConfirmAuth] = useState(false);
  const [letterOfAuth, setletterOfAuth] = useState(false);
  const [impactAssessmentUrl, setImpactAssessmentUrl] = useState<any>("");
  const [impactAssessmentDate, setImpactAssessmentDate] = useState<any>("");
  const [impactAssessmentStatus, setImpactAssessmentStatus] = useState<any>("");
  const [impactAssessmentId, setImpactAssessmentId] = useState<any>("");
  const [impactAssessmentversion, setImpactAssessmentversion] =
    useState<any>("");
  const maximumImageSize = process.env.REACT_APP_MAXIMUM_FILE_SIZE
    ? parseInt(process.env.REACT_APP_MAXIMUM_FILE_SIZE)
    : 5000000;

  const isProjectRejected =
    programmeStatus && programmeStatus === ProgrammeStageUnified.Rejected;

  const uploadImpactAssessmentDocUserPermission = uploadDocUserPermission(
    userInfoState,
    DocType.ENVIRONMENTAL_IMPACT_ASSESSMENT,
    programmeOwnerId,
    ministryLevelPermission
  );

  const impactAssessmentToolTipTitle =
    userInfoState?.userRole === Role.ViewOnly
      ? t("programme:notAuthToUploadDoc")
      : isProjectRejected
      ? t("programme:docUploadProgrammeRejected")
      : !uploadImpactAssessmentDocUserPermission && t("programme:orgNotAuth");

  const handleDesignDocFileUpload = () => {
    fileInputRef?.current?.click();
  };

  const handleMethodologyFileUpload = () => {
    fileInputRefMeth?.current?.click();
  };

  const handleImpactAssessmentFileUpload = () => {
    fileInputRefImpactAssessment?.current?.click();
  };

  useEffect(() => {
    setDocData(data);
    getletter_projet(programmeId);
    //Recuperer la liste des certificateurs
    //Faire la requete de validation
    //Demander la lettre d'approbation
    getcertificator();
  }, [data]);

  useEffect(() => {
    if (docData?.length) {
      docData?.map((item: any) => {
        if (item?.url?.includes("DESIGN")) {
          setDesignDocUrl(item?.url);
          setDesignDocDate(item?.txTime);
          setDesignDocStatus(item?.status);
          setDesignDocId(item?.id);
          const versionfull =
            (item?.url).split("_")[(item?.url).split("_").length - 1];
          const version = versionfull ? versionfull.split(".")[0] : "1";
          setDesignDocversion(version.startsWith("V") ? version : "V1");
        }
        if (item?.url?.includes("METHODOLOGY")) {
          setMethodologyDocUrl(item?.url);
          setMethodologyDate(item?.txTime);
          setMethodDocStatus(item?.status);
          setMethDocId(item?.id);
          const versionfull =
            (item?.url).split("_")[(item?.url).split("_").length - 1];
          const version = versionfull ? versionfull.split(".")[0] : "1";
          setMethDocversion(version.startsWith("V") ? version : "V1");
        }
        if (item?.url?.includes("OBJECTION")) {
          setNoObjectionDocUrl(item?.url);
          setNoObjectionDate(item?.txTime);
        }
        if (item?.url?.includes("AUTHORISATION")) {
          setAuthorisationDocUrl(item?.url);
          setAuthorisationDocDate(item?.txTime);
        }
        if (item?.url?.includes("ENVIRONMENTAL_IMPACT_ASSESSMENT")) {
          setImpactAssessmentUrl(item?.url);
          setImpactAssessmentDate(item?.txTime);
          setImpactAssessmentStatus(item?.status);
          setImpactAssessmentId(item?.id);
          const versionfull =
            (item?.url).split("_")[(item?.url).split("_").length - 1];
          const version = versionfull ? versionfull.split(".")[0] : "1";
          setImpactAssessmentversion(version.startsWith("V") ? version : "V1");
        }
      });
    }
  }, [docData]);

  const getcertificator = async () => {
    setLoading(true);
    try {
      console.log("getting certificator profile");
      const response = await post("national/organisation/query", {
        page: 1,
        size: 100,
        filterAnd: [
          {
            key: "companyRole",
            operation: "=",
            value: CompanyRole.CERTIFIER,
          },
        ],
      });
      if (response.data) {
        setlist_certificateur(response?.data);
      }
    } catch (error: any) {
      console.log("Error in getting government data", error);
    } finally {
      setLoading(false);
    }
  };

  const getletter_projet = async (programmeId:any) => {

    try {
    const headers: any = {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTcxMjg0MjEsImV4cCI6MTcyNzQ5NjQyMX0.fuU7TGjn2BIVkjM1puGCmwCS-CDkGXHDTfZxJno5kzQ`,
    };

    const method: string = "post";

    const url: string =
      "https://docregister.ci.skyvisionafrica.com/api/v1/doc/read_global";

    const data: any = {
      Id: programmeId,
      Type: "Projet",
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
        if(response.data.data.approbation_letter.exist==true){
          if(response.data.data.approbation_letter.signed==true){
            setapprovalDocUrlsigne(response.data.data.approbation_letter.link);
            
          }else{
            setapprovalDocUrl(response.data.data.approbation_letter.link);
          }
        }

        if(response.data.data.autorisation_letter.exist==true){
          if(response.data.data.autorisation_letter.signed==true){
            setAuthorisationDocUrlsigne(response.data.data.autorisation_letter.link);
            
          }else{
            setauthoriseDoc2Url(response.data.data.autorisation_letter.link);
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

  const onChangeCertificator = (val: any) => {
    setSelectedCertifier(val);
  };

  const onUploadModalCanceled = () => {
    setOpenUploadModalConfirm(false);
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


  
  const onUploadModalConfirmAuth = () => {
    setActionInfo({
      action: `Confirmer`,
      headerText: `Chargez votre lettre signée`,
      text: `${t("companyProfile:approveConfirmText")}`,
      type: "primary",
      icon: <Icon.ClipboardCheck />,
    });
    setErrorMsg("");
    setletterOfAuth(true);
    setOpenUploadModalConfirmAuth(true);
  };

  const onUploadModalCanceledAuth = () => {
    setOpenUploadModalConfirmAuth(false);
  };


  const handleFileChange = (event: any) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
  };


  const onUploadLetterSign = async () => {
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

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("Type", "approbation_letter"); // Replace with the actual type
    formData.append("Id_pro_idea", programmeId); // Replace with the actual ID

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
       // setMethodDocStatus("Accepted");
        // changer le status du registre 
        //Sauvegarder la lettre signée
       // docAction(methDocId, DocumentStatus.ACCEPTED);
       setapprovalDocUrlsigne(response.data.data.link);
        setOpenUploadModalConfirm(false);
        
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
      setLoading(false);
    }
  };

  const onUploadLetterSignAuth = async () => {
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
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("Type", "autorisation_letter"); // Replace with the actual type
    formData.append("Id_pro_idea", programmeId); // Replace with the actual ID
    const body={
      programmeId:programmeId,
      issueAmount:Number('0'),
      comment:''
    }
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
        console.log(body);
        try {
        const response_actualise = await put("national/programme/authorize", body);
        console.log(response_actualise.data);
        if (response_actualise.status === 200 || response_actualise.status === 201) {
          message.open({
            type: "success",
            content: "File uploaded successfully.",
            duration: 3,
            style: { textAlign: "right", marginRight: 15, marginTop: 10 },
          });
          setAuthorisationDocUrlsigne(response.data.data.link);

          updateProgrammeData(response_actualise);
         // setLoading(false);
         setOpenUploadModalConfirmAuth(false);
        }
      }catch (error) {
        console.error("Error uploading file:", error);
        message.open({
          type: "error",
          content: "Erreur  d'upload du fichier.",
          duration: 3,
          style: { textAlign: "right", marginRight: 15, marginTop: 10 },
        });
        setOpenUploadModalConfirmAuth(false);
      }
        /*
        onPopupAction(
          body,
          'authorize',
          t('view:successAuth'),
          put,
          updateProgrammeData()
        )*/
        //Changer le status du registre
        //Sauvegarder la lettre signée
        



        
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.open({
        type: "error",
        content: "Erreur  d'upload du fichier.",
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      setOpenUploadModalConfirmAuth(false);
    } finally {
      setLoading(false);
      setOpenUploadModalConfirmAuth(false);
    }
  };

  const generateletter = () => {
    try {
      setLoading(true);

      //Demander de generer un document

      const headers: any = {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTcxMjg0MjEsImV4cCI6MTcyNzQ5NjQyMX0.fuU7TGjn2BIVkjM1puGCmwCS-CDkGXHDTfZxJno5kzQ`,
      };

      const method: string = "post";

      const url: string =
        "https://docregister.ci.skyvisionafrica.com/api/v1/doc/create_project";

      const data: any = {
        IdProjet: programmeId,
        Type: "approbation_letter",
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
          //Modifier l'url de la lettre d'approbation
          setapprovalDocUrl(response.data.data.Url);
        }
      });

      setOpenRejectDocConfirmationModal(false);
      message.open({
        type: "success",
        content: "Lettre non signée générée avec succes",
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      //  getIdeaNoteDetails(IdeaNoteDetail.companyId);
      //   getUserDetails(IdeaNoteDetail.companyId);
    } catch (error: any) {
      message.open({
        type: "error",
        content: error.message,
        duration: 3,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
    } finally {
      setLoading(false);
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onUploadDocument = async (file: any, type: any) => {
    if (file.size > maximumImageSize) {
      message.open({
        type: "error",
        content: `${t("common:maxSizeVal")}`,
        duration: 4,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
      return;
    }

    setLoading(true);
    const logoBase64 = await getBase64(file as RcFile);
    try {
      if (isValidateFileType(file?.type, type)) {
        const response: any = await post("national/programme/addDocument", {
          type: type,
          data: logoBase64,
          programmeId: programmeId,
        });
        console.log(response);
        fileInputRefMeth.current = null;
        if (response?.data) {
          setDocData([...docData, response?.data]);
          methodologyDocumentUpdated();
          message.open({
            type: "success",
            content: `${t("programme:isUploaded")}`,
            duration: 4,
            style: { textAlign: "right", marginRight: 15, marginTop: 10 },
          });
        }
      } else {
        message.open({
          type: "error",
          content: `${t("programme:invalidFileFormat")}`,
          duration: 4,
          style: { textAlign: "right", marginRight: 15, marginTop: 10 },
        });
      }
    } catch (error: any) {
      fileInputRefMeth.current = null;
      message.open({
        type: "error",
        content: `${t("programme:notUploaded")}`,
        duration: 4,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
    } finally {
      getDocumentDetails();
      setLoading(false);
    }
  };

  const docAction = async (id: any, status: DocumentStatus) => {
    setLoading(true);
    try {
      const response: any = await post("national/programme/docAction", {
        id: id,
        status: status,
      });
      message.open({
        type: "success",
        content:
          status === DocumentStatus.ACCEPTED
            ? `${t("programme:docApproved")}`
            : `${t("programme:docRejected")}`,
        duration: 4,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });

      /**
       * Prevoir aussi une requete pour la certification avec ID du certificateur
       */
      //If Document status est accepté alors faire une requete de generation
      // De la lettre d'approbation non signé
      // Importer Axios puis faire la requete vers la plateforme de Suini
    } catch (error: any) {
      message.open({
        type: "error",
        content: error?.message,
        duration: 4,
        style: { textAlign: "right", marginRight: 15, marginTop: 10 },
      });
    } finally {
      setOpenRejectDocConfirmationModal(false);
      getDocumentDetails();
      getProgrammeById();
      setLoading(false);
    }
  };

  const handleOk = () => {
    docAction(rejectDocData?.id, DocumentStatus.REJECTED);
  };

  const handleCancel = () => {
    setOpenRejectDocConfirmationModal(false);
  };

  const handleOkApprove = () => {
    docAction(methDocId, DocumentStatus.ACCEPTED)
    // Certifie le projet avec le certificateur
    generateletter();
    setOpenApproveDocConfirmationModal(false);
  };

  const handleCancelApprove = () => {
    setOpenRejectDocConfirmationModal(false);
  };

  const companyRolePermission =
    userInfoState?.companyRole === CompanyRole.GOVERNMENT &&
    userInfoState?.userRole !== Role.ViewOnly;

  const designDocActionPermission =
    userInfoState?.companyRole === CompanyRole.GOVERNMENT &&
    userInfoState?.userRole !== Role.ViewOnly;

  const designDocPending = designDocStatus === DocumentStatus.PENDING;
  return loading ? (
    <Skeleton />
  ) : (
    <>
      <div className="info-view">
        <div className="title">
          <span className="title-icon">{icon}</span>
          <span className="title-text">{title}</span>
        </div>
        <div>
          <Row className="field" key="Design Document">
            <Col span={18} className="field-key">
              <div className="label-container">
                <div
                  className={designDocUrl !== "" ? "label-uploaded" : "label"}
                >
                  {t("programme:designDoc")}
                </div>
                {designDocPending &&
                  (designDocActionPermission || ministryLevelPermission) && (
                    <>
                      <LikeOutlined
                        onClick={() =>
                          docAction(designDocId, DocumentStatus.ACCEPTED)
                        }
                        className="common-progress-icon"
                        style={{ color: "#976ED7", paddingTop: "3px" }}
                      />
                      <DislikeOutlined
                        onClick={() => {
                          setRejectDocData({ id: designDocId });
                          setActionInfo({
                            action: "Reject",
                            headerText: `${t("programme:rejectDocHeader")}`,
                            text: `${t("programme:rejectDocBody")}`,
                            type: "reject",
                            icon: <DislikeOutlined />,
                          });
                          setOpenRejectDocConfirmationModal(true);
                        }}
                        className="common-progress-icon margin-left-1"
                        style={{ color: "#FD6F70", paddingTop: "3px" }}
                      />
                    </>
                  )}
                {designDocStatus === DocumentStatus.ACCEPTED && (
                  <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
                )}
                {designDocStatus === DocumentStatus.REJECTED && (
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={t("programme:rejectTip")}
                    overlayClassName="custom-tooltip"
                  >
                    <ExclamationCircleOutlined
                      className="common-progress-icon"
                      style={{ color: "#FD6F70" }}
                    />
                  </Tooltip>
                )}
              </div>
              {designDocUrl !== "" && (
                <div className="time">
                  {moment(parseInt(designDocDate)).format(
                    "DD MMMM YYYY @ HH:mm"
                  )}
                  {" ~ " + designDocversion}
                </div>
              )}
            </Col>
            <Col span={6} className="field-value">
              {designDocUrl !== "" ? (
                <div className="link">
                  {linkDocVisible(designDocStatus) && (
                    <a
                      href={designDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <BookOutlined
                        className="common-progress-icon"
                        style={{ color: "#3F3A47" }}
                      />
                    </a>
                  )}
                  {designDocStatus !== DocumentStatus.ACCEPTED && (
                    <>
                      <Tooltip
                        arrowPointAtCenter
                        placement="top"
                        trigger="hover"
                        title={
                          userInfoState?.userRole === Role.ViewOnly ||
                          userInfoState?.companyRole === CompanyRole.CERTIFIER
                            ? t("programme:notAuthToUploadDoc")
                            : !uploadDocUserPermission(
                                userInfoState,
                                DocType.DESIGN_DOCUMENT,
                                programmeOwnerId,
                                ministryLevelPermission
                              ) && t("programme:orgNotAuth")
                        }
                        overlayClassName="custom-tooltip"
                      >
                        <FileAddOutlined
                          className="common-progress-icon"
                          style={
                            uploadDocUserPermission(
                              userInfoState,
                              DocType.DESIGN_DOCUMENT,
                              programmeOwnerId,
                              ministryLevelPermission
                            )
                              ? {
                                  color: "#3F3A47",
                                  cursor: "pointer",
                                  margin: "0px 0px 1.5px 0px",
                                }
                              : {
                                  color: "#cacaca",
                                  cursor: "default",
                                  margin: "0px 0px 1.5px 0px",
                                }
                          }
                          onClick={() =>
                            uploadDocUserPermission(
                              userInfoState,
                              DocType.DESIGN_DOCUMENT,
                              programmeOwnerId,
                              ministryLevelPermission
                            ) && handleDesignDocFileUpload()
                          }
                        />
                      </Tooltip>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".xls, .xlsx, .ppt, .pptx, .csv, .doc, .docx, .pdf, .png, .jpg"
                        onChange={(e: any) => {
                          const selectedFile = e.target.files[0];
                          e.target.value = null;
                          onUploadDocument(
                            selectedFile,
                            DocType.DESIGN_DOCUMENT
                          );
                        }}
                      />
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={
                      userInfoState?.userRole === Role.ViewOnly ||
                      userInfoState?.companyRole === CompanyRole.CERTIFIER
                        ? t("programme:notAuthToUploadDoc")
                        : !uploadDocUserPermission(
                            userInfoState,
                            DocType.DESIGN_DOCUMENT,
                            programmeOwnerId,
                            ministryLevelPermission
                          ) && t("programme:orgNotAuth")
                    }
                    overlayClassName="custom-tooltip"
                  >
                    <FileAddOutlined
                      className="common-progress-icon"
                      style={
                        uploadDocUserPermission(
                          userInfoState,
                          DocType.DESIGN_DOCUMENT,
                          programmeOwnerId,
                          ministryLevelPermission
                        )
                          ? {
                              color: "#3F3A47",
                              cursor: "pointer",
                              margin: "0px 0px 1.5px 0px",
                            }
                          : {
                              color: "#cacaca",
                              cursor: "default",
                              margin: "0px 0px 1.5px 0px",
                            }
                      }
                      onClick={() =>
                        uploadDocUserPermission(
                          userInfoState,
                          DocType.DESIGN_DOCUMENT,
                          programmeOwnerId,
                          ministryLevelPermission
                        ) && handleDesignDocFileUpload()
                      }
                    />
                  </Tooltip>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".xls, .xlsx, .ppt, .pptx, .csv, .doc, .docx, .pdf, .png, .jpg"
                    onChange={(e: any) => {
                      const selectedFile = e.target.files[0];
                      e.target.value = null;
                      onUploadDocument(selectedFile, DocType.DESIGN_DOCUMENT);
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
          <Row className="field" key="Methodology Document">
            <Col span={18} className="field-key">
              <div className="label-container">
                <div
                  className={
                    methodologyDocUrl !== "" ? "label-uploaded" : "label"
                  }
                >
                  {t("programme:methDoc")}
                </div>
                {methodDocStatus === DocumentStatus.PENDING &&
                  (companyRolePermission || ministryLevelPermission) && (
                    <>
                      <LikeOutlined
                        onClick={() => {
                          //docAction(methDocId, DocumentStatus.ACCEPTED)
                          setActionInfo({
                            action: "APPROVE",
                            headerText: `Confirmez vous ce rapport de validation ?`,
                            text: `${t("programme:rejectDocBody")}`,
                            type: "approve",
                            icon: <LikeOutlined />,
                          });
                          setOpenApproveDocConfirmationModal(true);
                        }}
                        className="common-progress-icon"
                        style={{ color: "#976ED7", paddingTop: "3px" }}
                      />
                      <DislikeOutlined
                        onClick={() => {
                          setRejectDocData({ id: methDocId });
                          setActionInfo({
                            action: "Reject",
                            headerText: `${t("programme:rejectDocHeader")}`,
                            text: `${t("programme:rejectDocBody")}`,
                            type: "reject",
                            icon: <DislikeOutlined />,
                          });
                          setOpenRejectDocConfirmationModal(true);
                        }}
                        className="common-progress-icon margin-left-1"
                        style={{ color: "#FD6F70", paddingTop: "3px" }}
                      />
                    </>
                  )}
                {methodDocStatus === DocumentStatus.ACCEPTED && (
                  <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
                )}
                {methodDocStatus === DocumentStatus.REJECTED && (
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={t("programme:rejectTip")}
                    overlayClassName="custom-tooltip"
                  >
                    <ExclamationCircleOutlined
                      className="common-progress-icon"
                      style={{ color: "#FD6F70" }}
                    />
                  </Tooltip>
                )}
              </div>
              {methodologyDocUrl !== "" && (
                <div className="time">
                  {moment(parseInt(methodologyDate)).format(
                    "DD MMMM YYYY @ HH:mm"
                  )}
                  {" ~ " + methDocversion}
                </div>
              )}
            </Col>
            <Col span={6} className="field-value">
              {methodologyDocUrl !== "" ? (
                <div className="link">
                  {linkDocVisible(methodDocStatus) && (
                    <a
                      href={methodologyDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <BookOutlined
                        className="common-progress-icon"
                        style={{ color: "#3F3A47" }}
                      />
                    </a>
                  )}
                  {methodDocStatus !== DocumentStatus.ACCEPTED && (
                    <>
                      <Tooltip
                        arrowPointAtCenter
                        placement="top"
                        trigger="hover"
                        title={
                          userInfoState?.userRole === Role.ViewOnly
                            ? t("programme:notAuthToUploadDoc")
                            : !uploadDocUserPermission(
                                userInfoState,
                                DocType.METHODOLOGY_DOCUMENT,
                                programmeOwnerId,
                                ministryLevelPermission
                              ) && t("programme:orgNotAuth")
                        }
                        overlayClassName="custom-tooltip"
                      >
                        <FileAddOutlined
                          className="common-progress-icon"
                          style={
                            designDocStatus === DocumentStatus.ACCEPTED &&
                            uploadDocUserPermission(
                              userInfoState,
                              DocType.METHODOLOGY_DOCUMENT,
                              programmeOwnerId,
                              ministryLevelPermission
                            )
                              ? {
                                  color: "#3F3A47",
                                  cursor: "pointer",
                                  margin: "0px 0px 1.5px 0px",
                                }
                              : {
                                  color: "#cacaca",
                                  margin: "0px 0px 1.5px 0px",
                                }
                          }
                          onClick={() =>
                            designDocStatus === DocumentStatus.ACCEPTED &&
                            uploadDocUserPermission(
                              userInfoState,
                              DocType.METHODOLOGY_DOCUMENT,
                              programmeOwnerId,
                              ministryLevelPermission
                            ) &&
                            handleMethodologyFileUpload()
                          }
                        />
                      </Tooltip>
                      <input
                        type="file"
                        ref={fileInputRefMeth}
                        style={{ display: "none" }}
                        accept=".xls, .xlsx, .ppt, .pptx, .csv, .doc, .docx, .pdf, .png, .jpg"
                        onChange={(e: any) => {
                          const selectedFile = e.target.files[0];
                          e.target.value = null;
                          if (designDocStatus === DocumentStatus.ACCEPTED)
                            onUploadDocument(
                              selectedFile,
                              DocType.METHODOLOGY_DOCUMENT
                            );
                        }}
                      />
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={
                      userInfoState?.userRole === Role.ViewOnly
                        ? t("programme:notAuthToUploadDoc")
                        : uploadDocUserPermission(
                            userInfoState,
                            DocType.METHODOLOGY_DOCUMENT,
                            programmeOwnerId,
                            ministryLevelPermission
                          )
                        ? designDocStatus !== DocumentStatus.ACCEPTED &&
                          t("programme:designDocNotApproved")
                        : t("programme:orgNotAuth")
                    }
                    overlayClassName="custom-tooltip"
                  >
                    <FileAddOutlined
                      className="common-progress-icon"
                      style={
                        designDocStatus === DocumentStatus.ACCEPTED &&
                        uploadDocUserPermission(
                          userInfoState,
                          DocType.METHODOLOGY_DOCUMENT,
                          programmeOwnerId,
                          ministryLevelPermission
                        )
                          ? {
                              color: "#3F3A47",
                              cursor: "pointer",
                              margin: "0px 0px 1.5px 0px",
                            }
                          : {
                              color: "#cacaca",
                              cursor: "default",
                              margin: "0px 0px 1.5px 0px",
                            }
                      }
                      onClick={() =>
                        designDocStatus === DocumentStatus.ACCEPTED &&
                        uploadDocUserPermission(
                          userInfoState,
                          DocType.METHODOLOGY_DOCUMENT,
                          programmeOwnerId,
                          ministryLevelPermission
                        ) &&
                        handleMethodologyFileUpload()
                      }
                    />
                  </Tooltip>
                  <input
                    type="file"
                    ref={fileInputRefMeth}
                    style={{ display: "none" }}
                    accept=".xls, .xlsx, .ppt, .pptx, .csv, .doc, .docx, .pdf, .png, .jpg"
                    onChange={(e: any) => {
                      const selectedFile = e.target.files[0];
                      e.target.value = null;
                      if (designDocStatus === DocumentStatus.ACCEPTED)
                        onUploadDocument(
                          selectedFile,
                          DocType.METHODOLOGY_DOCUMENT
                        );
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
          {authorisationDocUrlsigne!== "" ? (
            <Row className="field" key="Authorisation Document">
              <Col span={18} className="field-key">
              <div className="label-container">
              <div className="label-uploaded">{t("programme:authLetterLabel")}</div>
                <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
              </div>
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={authorisationDocUrlsigne}
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
          {authoriseDoc2Url !== "" && (          
            <Row className="field" key="Approval Document">
              <Col span={18} className="field-key">
              <div className="label-container">
              <div className="label-uploaded">{t("programme:authLetterLabel")}</div>

              </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={authoriseDoc2Url}
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
                      onUploadModalConfirmAuth();
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

          {approvalDocUrlsigne !== "" ? (
            <Row className="field" key="Approval Document">
              <Col span={18} className="field-key">
              <div className="label-container">
              <div className="label-uploaded">Lettre d'approbation</div>
                <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
              </div>
                
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={approvalDocUrlsigne}
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
            {approvalDocUrl !== "" && (
              <Row className="field" key="Approval Document">
              <Col span={18} className="field-key">
                <div className="label-uploaded">Lettre d'Approbation</div>
              </Col>
              <Col span={6} className="field-value">
                <div className="link">
                  <a
                    href={approvalDocUrl}
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
          <Row className="field" key="Environmental Impact Assessment">
            <Col span={18} className="field-key">
              <div className="label-container">
                <div
                  className={
                    impactAssessmentUrl !== "" ? "label-uploaded" : "label"
                  }
                >
                  {t("programme:environmentalImpactAssessment")}
                </div>
                {impactAssessmentStatus === DocumentStatus.PENDING &&
                  (ministryLevelPermission || companyRolePermission) && (
                    <>
                      <LikeOutlined
                        onClick={() =>
                          docAction(impactAssessmentId, DocumentStatus.ACCEPTED)
                        }
                        className="common-progress-icon"
                        style={{ color: "#976ED7", paddingTop: "3px" }}
                      />
                      <DislikeOutlined
                        onClick={() => {
                          setRejectDocData({ id: impactAssessmentId });
                          setActionInfo({
                            action: "Reject",
                            headerText: `${t("programme:rejectDocHeader")}`,
                            text: `${t("programme:rejectDocBody")}`,
                            type: "reject",
                            icon: <DislikeOutlined />,
                          });
                          setOpenRejectDocConfirmationModal(true);
                        }}
                        className="common-progress-icon margin-left-1"
                        style={{ color: "#FD6F70", paddingTop: "3px" }}
                      />
                    </>
                  )}
                {impactAssessmentStatus === DocumentStatus.ACCEPTED && (
                  <CheckCircleOutlined
                    className="common-progress-icon"
                    style={{ color: "#5DC380", paddingTop: "3px" }}
                  />
                )}
                {impactAssessmentStatus === DocumentStatus.REJECTED && (
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={t("programme:rejectTip")}
                    overlayClassName="custom-tooltip"
                  >
                    <ExclamationCircleOutlined
                      className="common-progress-icon"
                      style={{ color: "#FD6F70" }}
                    />
                  </Tooltip>
                )}
              </div>
              {impactAssessmentUrl !== "" && (
                <div className="time">
                  {moment(parseInt(impactAssessmentDate)).format(
                    "DD MMMM YYYY @ HH:mm"
                  )}
                  {" ~ " + impactAssessmentversion}
                </div>
              )}
            </Col>
            <Col span={6} className="field-value">
              {impactAssessmentUrl !== "" ? (
                <div className="link">
                  {linkDocVisible(impactAssessmentStatus) && (
                    <a
                      href={impactAssessmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <div>
                        <BookOutlined
                          className="common-progress-icon"
                          style={{ color: "#3F3A47" }}
                        />
                      </div>
                    </a>
                  )}
                  {impactAssessmentStatus !== DocumentStatus.ACCEPTED && (
                    <>
                      <Tooltip
                        arrowPointAtCenter
                        placement="top"
                        trigger="hover"
                        title={impactAssessmentToolTipTitle}
                        overlayClassName="custom-tooltip"
                      >
                        <FileAddOutlined
                          className="common-progress-icon"
                          style={
                            uploadImpactAssessmentDocUserPermission &&
                            !isProjectRejected
                              ? {
                                  color: "#3F3A47",
                                  cursor: "pointer",
                                  margin: "0px 0px 1.5px 0px",
                                }
                              : {
                                  color: "#cacaca",
                                  cursor: "default",
                                  margin: "0px 0px 1.5px 0px",
                                }
                          }
                          onClick={() =>
                            uploadImpactAssessmentDocUserPermission &&
                            !isProjectRejected &&
                            handleImpactAssessmentFileUpload()
                          }
                        />
                      </Tooltip>
                      <input
                        type="file"
                        ref={fileInputRefImpactAssessment}
                        style={{ display: "none" }}
                        accept=".doc, .docx, .pdf, .png, .jpg"
                        onChange={(e: any) => {
                          const selectedFile = e.target.files[0];
                          e.target.value = null;
                          onUploadDocument(
                            selectedFile,
                            DocType.ENVIRONMENTAL_IMPACT_ASSESSMENT
                          );
                        }}
                      />
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Tooltip
                    arrowPointAtCenter
                    placement="top"
                    trigger="hover"
                    title={impactAssessmentToolTipTitle}
                    overlayClassName="custom-tooltip"
                  >
                    <FileAddOutlined
                      className="common-progress-icon"
                      style={
                        uploadImpactAssessmentDocUserPermission &&
                        !isProjectRejected
                          ? {
                              color: "#3F3A47",
                              cursor: "pointer",
                              margin: "0px 0px 1.5px 0px",
                            }
                          : {
                              color: "#cacaca",
                              cursor: "default",
                              margin: "0px 0px 1.5px 0px",
                            }
                      }
                      onClick={() =>
                        uploadImpactAssessmentDocUserPermission &&
                        !isProjectRejected &&
                        handleImpactAssessmentFileUpload()
                      }
                    />
                  </Tooltip>
                  <input
                    type="file"
                    ref={fileInputRefImpactAssessment}
                    style={{ display: "none" }}
                    accept=".doc, .docx, .pdf, .png, .jpg"
                    onChange={(e: any) => {
                      const selectedFile = e.target.files[0];
                      e.target.value = null;
                      onUploadDocument(
                        selectedFile,
                        DocType.ENVIRONMENTAL_IMPACT_ASSESSMENT
                      );
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
      <RejectDocumentationConfirmationModel
        actionInfo={actionInfo}
        onActionConfirmed={handleOk}
        onActionCanceled={handleCancel}
        openModal={openRejectDocConfirmationModal}
        errorMsg={""}
        loading={loading}
        translator={translator}
      />
      <ApproveDocumentationConfirmationModel
        actionInfo={actionInfo}
        onActionConfirmed={handleOkApprove}
        onActionCanceled={handleCancelApprove}
        openModal={openApproveDocConfirmationModal}
        list_certificateur={list_certificateur}
        onChangeCertificator={onChangeCertificator}
        errorMsg={""}
        loading={loading}
        translator={translator}
      />
      <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onUploadLetterSign}
        onActionCanceled={onUploadModalCanceled}
        openModal={openUploadModalConfirm}
        uploadmodal={openUploadModalConfirm}
        onUploadLetter={onUploadLetterSign}
        handleFileChange={handleFileChange}
        errorMsg={errorMsg}
        loading={loading}
      />
            <UserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onUploadLetterSignAuth}
        onActionCanceled={onUploadModalCanceledAuth}
        openModal={openUploadModalConfirmAuth}
        letterOfAuth={letterOfAuth}
        uploadmodal={openUploadModalConfirmAuth}
        onUploadLetter={onUploadLetterSignAuth}
        handleFileChange={handleFileChange}
        errorMsg={errorMsg}
        loading={loading}
      />
    </>
  );
};
