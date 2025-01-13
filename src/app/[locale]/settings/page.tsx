import { api } from '@/lib/api/server';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { user } = await api.auth.state();
  return (
    <div>
      <h1>Settings</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}
