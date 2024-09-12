import { Box } from '@/components/test/Box';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function TestPage({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);
  return (
    <div className='m-8 bg-primary'>
      <h1 className='m-25 text-red-100'>Kult</h1>
      <p className='bg-red-200'>Hackerspace</p>
      <Box />
    </div>
  );
}
