import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('management');

  return {
    title: `${t('title')} | ${t('skills.title')}`,
  };
}

export default async function SkillsManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const skills = await api.skills.fetchAllSkills();

  return (
    <>
      <Link
        href='/management'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={t('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToManagement')}
      </Link>
      <div className='relative'>
        <h1 className='md:text-center'>{t('skills.title')}</h1>
        <div className='-translate-y-1/2 absolute top-1/2 right-0 flex gap-2'>
          <Link variant='default' size='icon' href='/management/skills/new'>
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className='my-4 grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {skills.map((skill) => (
          <Link
            href={{
              pathname: '/management/skills/[skillIdentifier]',
              params: { skillIdentifier: skill.identifier },
            }}
            key={skill.id}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === 'en-GB' ? skill.nameEnglish : skill.nameNorwegian}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
