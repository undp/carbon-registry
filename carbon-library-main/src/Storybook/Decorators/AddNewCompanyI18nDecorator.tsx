import React from "react";
import { useTranslation } from 'react-i18next';

export default function AddNewCompanyI18nDecorator(Story:any, context:any) {
    const { t } = useTranslation(['addCompany']);
    context.args.t = t;

    return (
      <Story/>
    )
}