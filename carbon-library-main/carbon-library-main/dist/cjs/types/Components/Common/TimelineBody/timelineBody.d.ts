import { FC } from "react";
import "./timelineBody.scss";
export interface TimelineBodyProps {
    text: string;
    remark?: string | null;
    via?: string | null;
    t: any;
}
export declare const addNdcDesc: (props: any) => string;
export declare const TimelineBody: FC<TimelineBodyProps>;
