/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
import "antd/dist/antd.css";
import ConnectionContextDecorator from './Decorators/ConnectionContextDecorator';
declare const meta: {
    title: string;
    component: (props: any) => import("react").JSX.Element;
    decorators: (typeof ConnectionContextDecorator)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
