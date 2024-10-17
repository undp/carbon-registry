import { Alert, Form, Modal, Select, Button, Input } from "antd";
import React, { FC, useEffect, useState } from "react";
import "../../../Styles/app.scss";
const { TextArea } = Input;

export interface ApproveDocumentationProps {
  actionInfo: any;
  onActionConfirmed: any;
  onActionCanceled: any;
  openModal: any;
  list_certificateur: any;
  onChangeCertificator: any;
  errorMsg: any;
  loading: any;
  translator: any;
}

export const ApproveDocumentationConfirmationModel: FC<
  ApproveDocumentationProps
> = (props: ApproveDocumentationProps) => {
  const {
    actionInfo,
    onActionConfirmed,
    onActionCanceled,
    openModal,
    list_certificateur,
    onChangeCertificator,
    errorMsg,
    loading,
    translator,
  } = props;

  const t = translator.t;
  const [comment, setComment] = useState<any>("");

  useEffect(() => {
    setComment("");
  }, [openModal]);

  return (
    <Modal
      title={
        <div className="popup-header">
          <div className="icon">{actionInfo.icon}</div>
          <div>{actionInfo.headerText}</div>
        </div>
      }
      className={"popup-" + actionInfo.type}
      open={openModal}
      width={Math.min(400, window.innerWidth)}
      centered={true}
      onCancel={onActionCanceled}
      destroyOnClose={true}
      footer={null}
    >
      <p style={{ whiteSpace: "pre-line" }}>{actionInfo.text}</p>
      <Form
        layout="vertical"
        onFinish={() => {
          onActionConfirmed(comment);
        }}
      >
        <Form.Item
          className="mg-bottom-0"
          label={t("programme:remarks")}
          name="remarks"
          rules={[
            {
              required: true,
              message:
                `${t("programme:remarks")}` + " " + `${t("common:isRequired")}`,
            },
          ]}
        >
          <TextArea
            defaultValue={comment}
            rows={2}
            onChange={(v) => setComment(v.target.value)}
          />
        </Form.Item>

        {errorMsg ? (
          <Alert
            className="mg-top-1"
            message={errorMsg}
            type="error"
            showIcon
          />
        ) : (
          ""
        )}

        <div>
          <br />
          <h6>Selectionnez le certificateur </h6>
          <Select size="large" onChange={onChangeCertificator}>
            {list_certificateur.map((organisation) => (
              <Select.Option
                key={organisation.companyId}
                value={organisation.taxId}
              >
                {organisation.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="mg-top-1 ant-modal-footer padding-bottom-0">
          <Button
            htmlType="button"
            onClick={() => {
              onActionCanceled();
            }}
          >
            CANCEL
          </Button>
          <Button
            className="mg-left-2"
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={actionInfo.type === "approve" && comment === ""}
          >
            VALIDER
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
