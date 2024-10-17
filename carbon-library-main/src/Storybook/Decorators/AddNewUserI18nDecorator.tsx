import React from "react";
import { useTranslation } from 'react-i18next';

export default function AddNewUserI18nDecorator(Story:any, context:any) {
    const { t } = useTranslation(['addUser', 'passwordReset', 'userProfile']);
    context.args.t = t;

    return (
      <Story/>
    )
}