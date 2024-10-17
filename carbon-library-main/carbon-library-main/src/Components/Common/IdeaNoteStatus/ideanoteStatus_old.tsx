import React from 'react';
import './IdeaNoteStatus.scss';

export interface IdeaNoteStatusProps {
    IdeaNoteStatus: string;
  t: any;
}

export const IdeaNoteStatus = (props: IdeaNoteStatusProps) => {
  const { IdeaNoteStatus, t } = props;
  let orgState = (
    <div className="mg-top-1 IdeaNote-status-deauthorised">
      {t('companyProfile:deauthorisedStatus')}
    </div>
  );

  switch (IdeaNoteStatus) {
    case "valide":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-active">Actif</div>
      );
      break;

      case "en_attente":
      orgState = (
        <div className="mg-top-1 IdeaNote-status-pending">En attente</div>
      );
      break;

      case "rejete":
        orgState = (
          <div className="mg-top-1 IdeaNote-status-rejected">Rejeté</div>
        );
        break;
  
    default:
      break;
  }

  return orgState;
};

