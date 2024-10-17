import type { Meta, StoryObj } from "@storybook/react";
import { AddNewCompanyComponent } from "../Components/Company/AddNewCompany/addNewCompanyComponent";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
import AddNewCompanyI18nDecorator from './Decorators/AddNewCompanyI18nDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Company/AddNewCompany",
  component: AddNewCompanyComponent,
  decorators: [
    ConnectionContextDecorator,
    AddNewCompanyI18nDecorator
  ],
} satisfies Meta<typeof AddNewCompanyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    useLocation: () => { return {state:null} },
    maximumImageSize: 3145728,
    regionField: false,
  },
};
