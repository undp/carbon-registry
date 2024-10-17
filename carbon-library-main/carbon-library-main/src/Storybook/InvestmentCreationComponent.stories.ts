import type { Meta, StoryObj } from "@storybook/react";
import { InvestmentCreationComponent } from "../Components/Investment/AddNewInvestment/investmentCreationComponent";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
import InvestmentCreationI18nDecorator from './Decorators/InvestmentCreationI18nDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Investment/AddNewInvestment",
  component: InvestmentCreationComponent,
  decorators: [
    ConnectionContextDecorator,
    InvestmentCreationI18nDecorator
  ],
} satisfies Meta<typeof InvestmentCreationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    useLocation: () => { return {state:null} },
    onNavigateToProgrammeManagementView: () => { return null },
    onNavigateToProgrammeView: () => { return null },
  },
};
