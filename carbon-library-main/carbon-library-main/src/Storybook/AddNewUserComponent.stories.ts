import type { Meta, StoryObj } from "@storybook/react";
import { AddNewUserComponent } from "../Components/User/AddNewUser/addNewUserComponent";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
import AddNewUserI18nDecorator from './Decorators/AddNewUserI18nDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "User/AddNewUser",
  component: AddNewUserComponent,
  decorators: [
    ConnectionContextDecorator,
    AddNewUserI18nDecorator
  ],
} satisfies Meta<typeof AddNewUserComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    useLocation: () => { return {state:null} },
    useAbilityContext: () => { return null }
  },
};
