import { Badge } from '@/components/ui/Badge';
import { Link } from '@/lib/locale/navigation';
import Image from 'next/image';

type SubPagesProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  photoUrl: string;
};

function SubPages({ className, id, internal, title, photoUrl }: SubPagesProps) {
  return (
    <Link
      href={{
        pathname: '/rules/[subset]',
        params: { subset: id },
      }}
    >
      <div className='mx-auto mb-3 flex min-h-[3.18rem] min-w-[20rem] max-w-2xl transform rounded-xl border transition delay-150 duration-300 ease-in-out hover:scale-105 hover:shadow-lg'>
        <div className='flex w-1/4'>
          {internal ? (
            <Badge className='size-full items-center justify-center rounded-l-lg text-lg hover:bg-primary'>
              Intern
            </Badge>
          ) : (
            <Image
              className='size-full rounded-l-lg object-cover'
              src={`/${photoUrl}`}
              alt={title}
              width={150}
              height={150}
            />
          )}
        </div>
        <div className='flex w-3/4 items-center justify-center'>
          <h3 className='text-center text-lg sm:text-xl lg:text-2xl'>
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export { SubPages };
