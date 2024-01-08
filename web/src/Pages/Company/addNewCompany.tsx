import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AddNewCompanyComponent, CarbonSystemType } from '@undp/carbon-library';

const AddNewCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['addCompany']);

  const maximumImageSize = process.env.MAXIMUM_IMAGE_SIZE
    ? parseInt(process.env.MAXIMUM_IMAGE_SIZE)
    : 3145728;

  const onNavigateToCompanyManagement = () => {
    navigate('/companyManagement/viewAll', { replace: true });
  };

  return (
    <AddNewCompanyComponent
      t={t}
      onNavigateToCompanyManagement={onNavigateToCompanyManagement}
      maximumImageSize={maximumImageSize}
      useLocation={useLocation}
      regionField
      systemType={CarbonSystemType.REGISTRY}
    ></AddNewCompanyComponent>
  );
};

export default AddNewCompany;
