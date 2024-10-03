import { Button } from '@/components/ui/Button';
import { Card, CardFooter, CardHeader } from '@/components/ui/Card';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function LeaderboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('leaderboard');

  return (
    
    <div>
      <h1 className='items-cemter justify-center w-full flex mt-4'> Ledelsen </h1>
      <div className='flex w-full'>
        <p>
          {t('About_Leaderboard')}
        </p>
      </div>
      <div className='w-full max-x-xs px-20'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 dark:text-primary'>
            <div className=''>
              <h3 className='mb-2'> Leder </h3>
              <Card className='p-20'>
                <CardHeader>leder</CardHeader> {/* use medlem-components instead.  */}
                <CardFooter>
                  <Button> send email </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <h3 className='mb-2'> Nestleder </h3>
              <Card className='p-20'>
                <CardHeader> nest leder </CardHeader>
                <CardFooter>
                  <Button>send email</Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <h3 className='mb-2'> Tillitsvalgt </h3>
              <Card className='p-20'>
                <CardHeader> Tillietsvalgt </CardHeader>
                <CardFooter>
                  <Button>send email</Button>
                </CardFooter>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
