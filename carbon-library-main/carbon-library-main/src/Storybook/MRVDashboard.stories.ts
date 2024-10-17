import type { Meta, StoryObj } from "@storybook/react";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
import { MrvDashboardComponent, ProgrammeCreationComponent } from "../Components";
import ProgrammeCreateI18nDecorator from "./Decorators/ProgrammeCreateI18nDecorator";
import DashboardI18nDecorator from "./Decorators/DashboardI18nDecorator";
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import ButtonGroup from 'antd/lib/button/button-group';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Dashboard/MRV",
  component: MrvDashboardComponent,
  decorators: [
    ConnectionContextDecorator,
    DashboardI18nDecorator
  ],
} satisfies Meta<typeof MrvDashboardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// const { t } = useTranslation(['common', 'addProgramme']);
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    useLocation: () => { return {state:null} },
    useAbilityContext: () => { return null },
    Chart: Chart,
    Link: Link,
    ButtonGroup: ButtonGroup
  },
};
