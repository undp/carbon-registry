import React from "react";
import { useTranslation } from "react-i18next";

export default function DashboardI18nDecorator(Story: any, context: any) {
  const { t } = useTranslation(["mrvdashboard", "dashboard"]);
  context.args.t = t;

  return (
      <Story />
  );
}
