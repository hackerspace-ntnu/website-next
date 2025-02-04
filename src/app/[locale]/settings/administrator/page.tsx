import { api } from '@/lib/api/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('administrator'),
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  return (
    <div>
      <h1>Settings</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
