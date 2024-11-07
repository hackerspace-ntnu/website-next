import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Link } from '@/lib/locale/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function CreateAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('auth');
  return (
    <div className='flex h-full flex-col transition-opacity duration-500'>
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('success')}</h1>
        <p className='text-sm'>
          {
            'you are now a member of Hackerspace. Now you can finally start praying to our one true leader'
          }
        </p>
      </div>
      <Separator />
      <div className='absolute bottom-0 space-y-4'>
        <Button asChild>
          <Link href='/'>{t('home')}</Link>
        </Button>
      </div>
    </div>
  );
}
