import { setRequestLocale } from 'next-intl/server';

export default async function QuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div>quotes page</div>;
}
