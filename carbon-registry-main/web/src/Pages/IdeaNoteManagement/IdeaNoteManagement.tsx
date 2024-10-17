import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAbilityContext } from '../../Casl/Can';
import { IdeaNoteManagementComponent, IdeaNoteManagementColumns } from 'carbon-library_ci';

const CompanyManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['company', 'companyProfile']);

  const visibleColumns = [
    IdeaNoteManagementColumns.logo,
    IdeaNoteManagementColumns.denomination,
    IdeaNoteManagementColumns.ref_note_idee,
    IdeaNoteManagementColumns.Statut,
    IdeaNoteManagementColumns.date_soumission,
    IdeaNoteManagementColumns.action,
  ];

  const navigateToIdeaNoteDetail = (record: any) => {
    navigate('/IdeaNoteDetail/view', { state: { record } });
  };

  const navigateToAddNewCompany = () => {
    navigate('/companyManagement/addCompany');
  };

  return (
    <IdeaNoteManagementComponent
      t={t}
      useAbilityContext={useAbilityContext}
      visibleColumns={visibleColumns}
      onNavigateToIdeaNoteDetail={navigateToIdeaNoteDetail}
      onClickAddCompany={navigateToAddNewCompany}
    ></IdeaNoteManagementComponent>
  );
};

export default CompanyManagement;
