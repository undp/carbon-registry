import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    ProgrammeManagementColumns.serialNo,
  ];

  const onNavigateToProgrammeView = (record: any) => {
    navigate(`/programmeManagement/view/${record.programmeId}`, { state: { record } });
  };

  return (
    <ProgrammeManagementComponent
      t={t}
      visibleColumns={visibleColumns}
      onNavigateToProgrammeView={onNavigateToProgrammeView}
      enableAddProgramme={false}
      useAbilityContext={useAbilityContext}
    ></ProgrammeManagementComponent>
  );
};

export default ProgrammeManagement;
