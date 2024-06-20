'use client'

import {useTranslations} from "next-intl";

export default function Home() {
    const t = useTranslations();

  return (
      <div>
        <h1>Hello</h1>
        <a href='/login' className="btn btn-primary me-2">{t('Login')}</a>
        <a href='/register' className="btn btn-primary">{t('Register')}</a>
      </div>
  );
}
