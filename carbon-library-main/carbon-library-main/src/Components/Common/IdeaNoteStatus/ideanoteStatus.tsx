import React from "react";
import "./IdeaNoteStatus.scss";

export interface IdeaNoteStatusProps {
  IdeaNoteStatus: string;
  t: any;
}

export const IdeaNoteStatus = (props: IdeaNoteStatusProps) => {
  const { IdeaNoteStatus, t } = props;
  let orgState = (
    <div className="mg-top-1 IdeaNote-status-deauthorised">
      {t("companyProfile:deauthorisedStatus")}
    </div>
  );

  switch (IdeaNoteStatus) {
    case "valide":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-active">Eligible</div>
      );
      break;

    case "en_attente":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-pending">En attente</div>
      );
      break;

    case "refuse":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-rejected">Refusée</div>
      );
      break;
    case "recours":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-recours">Recours</div>
      );
      break;

    case "cloturer_refuse":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-cloturer_refuse">
          Refusée et cloturée
        </div>
      );
      break;
    default:
      break;
  }

  return orgState;
};
