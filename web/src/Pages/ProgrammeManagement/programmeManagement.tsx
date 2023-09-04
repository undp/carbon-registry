import { useNavigate } from 'react-router-dom';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { ProgrammeManagementColumns, ProgrammeManagementComponent } from '@undp/carbon-library';
import { useAbilityContext } from '../../Casl/Can';

const ProgrammeManagement = () => {
  const { i18n, t } = useTranslation(['common', 'programme']);
  const navigate = useNavigate();

  const visibleColumns = [
    ProgrammeManagementColumns.title,
    ProgrammeManagementColumns.company,
    ProgrammeManagementColumns.sector,
    ProgrammeManagementColumns.currentStage,
    ProgrammeManagementColumns.creditIssued,
    ProgrammeManagementColumns.creditBalance,
    ProgrammeManagementColumns.creditTransferred,
    ProgrammeManagementColumns.certifierId,
    ProgrammeManagementColumns.serialNo
  ];

  const onNavigateToProgrammeView = (record: any) => {
    navigate('/programmeManagement/view', { state: { record } });
  };

  return (
    <ProgrammeManagementComponent
      t={t}
      visibleColumns={visibleColumns}
      useUserContext={useUserContext}
      useConnection={useConnection}
      onNavigateToProgrammeView={onNavigateToProgrammeView}
      enableAddProgramme = {false}
      useAbilityContext={useAbilityContext}
    ></ProgrammeManagementComponent>
  );
};

export default ProgrammeManagement;
