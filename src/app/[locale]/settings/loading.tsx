import { Spinner } from '@/components/ui/Spinner';

export default function SettingssLoading() {
  return (
    <div className='flex h-full w-full items-center justify-center p-16'>
      <Spinner size='lg' />
    </div>
  );
}
