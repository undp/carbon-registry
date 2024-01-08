import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import ButtonGroup from 'antd/lib/button/button-group';
import { RegistryDashboardComponent } from '@undp/carbon-library';

const Dashboard = () => {
  const { t } = useTranslation(['dashboard']);
  return (
    <RegistryDashboardComponent
      Chart={Chart}
      t={t}
      ButtonGroup={ButtonGroup}
      Link={Link}
    ></RegistryDashboardComponent>
  );
};

export default Dashboard;
