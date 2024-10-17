import React from "react";
import { useTranslation } from "react-i18next";

export default function ProgrammeCreateI18nDecorator(Story: any, context: any) {
  const { t } = useTranslation(["common", "addProgramme"]);
  context.args.translator = { t };

  return (
      <Story />
  );
}
