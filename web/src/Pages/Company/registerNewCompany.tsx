import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { AddNewCompanyComponent } from '@undp/carbon-library';
import './registerNewCompany.scss';

const RegisterNewCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['addCompany']);

  const maximumImageSize = process.env.MAXIMUM_IMAGE_SIZE
    ? parseInt(process.env.MAXIMUM_IMAGE_SIZE)
    : 3145728;

  const onNavigateToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="register-company-container">
      <AddNewCompanyComponent
        t={t}
        maximumImageSize={maximumImageSize}
        useConnection={useConnection}
        useUserContext={useUserContext}
        useLocation={useLocation}
        isGuest={true}
        onNavigateToHome={onNavigateToHome}
      ></AddNewCompanyComponent>
    </div>
  );
};

export default RegisterNewCompany;
