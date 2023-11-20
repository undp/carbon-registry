import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
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
      useConnection={useConnection}
      useUserContext={useUserContext}
      useLocation={useLocation}
      systemType={CarbonSystemType.REGISTRY}
    ></AddNewCompanyComponent>
  );
};

export default AddNewCompany;
