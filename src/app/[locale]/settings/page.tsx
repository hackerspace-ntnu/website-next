import { api } from '@/lib/api/server';
import { setRequestLocale } from 'next-intl/server';

export default async function SettingsPage({
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
