import type { Meta, StoryObj } from "@storybook/react";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
import { ProgrammeCreationComponent } from "../Components";
import ProgrammeCreateI18nDecorator from "./Decorators/ProgrammeCreateI18nDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Programme/AddProgramme",
  component: ProgrammeCreationComponent,
  decorators: [
    ConnectionContextDecorator,
    ProgrammeCreateI18nDecorator
  ],
} satisfies Meta<typeof ProgrammeCreationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// const { t } = useTranslation(['common', 'addProgramme']);
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    useLocation: () => { return {state:null} },
    useAbilityContext: () => { return null },
    onNavigateToProgrammeView: () => {
      return null
    }
  },
};
