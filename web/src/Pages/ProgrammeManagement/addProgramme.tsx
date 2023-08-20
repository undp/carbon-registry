import { NdcActionManagementComponent, ProgrammeCreationComponent } from '@undp/carbon-library';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddProgramme = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'addProgramme']);

  const onNavigateToProgrammeManagementView = (programmeId: any) => {
    navigate('/programmeManagement/viewAll', { state: { id: programmeId } });
  };

  return (
    <ProgrammeCreationComponent
      t={t}
      useLocation={useLocation}
      useConnection={useConnection}
      useUserContext={useUserContext}
      onNavigateToProgrammeView={onNavigateToProgrammeManagementView}
    ></ProgrammeCreationComponent>
  );
};

export default AddProgramme;