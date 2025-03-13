import { setRequestLocale } from 'next-intl/server';

export default async function NewQuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div>new quotes page</div>;
}
