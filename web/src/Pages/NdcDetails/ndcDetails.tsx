import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NdcDetailsComponent, useConnection, useUserContext } from '@undp/carbon-library';

const NdcDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['ndc']);

  return (
    <NdcDetailsComponent
      t={t}
      useConnection={useConnection}
      useUserContext={useUserContext}
    ></NdcDetailsComponent>
  );
};

export default NdcDetails;
