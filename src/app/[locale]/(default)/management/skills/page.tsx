import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user || !user.groups.includes('admin')) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const skills = await api.skills.fetchAllSkills();

  return (
    <>
      <h1>{t('title')}</h1>
      <div className='my-4 grid grid-cols-2 gap-4'>
        {skills.map((skill) => (
          <Link
            href={{
              pathname: '/management/skills/[skillId]',
              params: { skillId: skill.id },
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
