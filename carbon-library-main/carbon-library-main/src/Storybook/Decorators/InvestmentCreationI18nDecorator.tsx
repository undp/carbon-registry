import React from "react";
import { useTranslation } from 'react-i18next';

export default function InvestmentCreationI18nDecorator(Story:any, context:any) {
    const { t } = useTranslation(['common', 'programme'])
    context.args.t = t;

    return (
      <Story/>
    )
}