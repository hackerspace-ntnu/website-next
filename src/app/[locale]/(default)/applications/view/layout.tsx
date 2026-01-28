import { getTranslations } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { api } from '@/lib/api/server';

export default async function ApplicationsViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await api.auth.state();
  const t = await getTranslations('applications');

  if (
    !user ||
    !['admin', 'management'].some((group) => user.groups.includes(group))
  ) {
    return <ErrorPageContent message={t('view.unauthorized')} />;
  }

  return children;
}
