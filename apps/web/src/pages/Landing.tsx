import { useTranslation } from 'react-i18next';
export default function Landing(){
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      <p className="opacity-70 mt-2">Pi escrow-powered marketplace.</p>
    </div>
  );
}
