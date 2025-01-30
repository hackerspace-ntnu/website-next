import { cx } from '@/lib/utils';
import Image from 'next/image';

type TextBlockProps = {
  src: string;
  alt: string;
  children: React.ReactElement[];
  side: 'left' | 'right';
};

function TextBlock({ src, alt, children, side }: TextBlockProps) {
  const image = (
    <div className='relative min-h-64 w-5/12'>
      <Image
        className='min-h-fit rounded-lg'
        src={src}
        alt={alt}
        fill
        loading='lazy'
        objectFit='contain'
      />
    </div>
  );

  return (
    <div
      className={cx(
        side === 'left' ? 'mr-auto' : 'ml-auto',
        'flex w-11/12 justify-between',
      )}
    >
      {side === 'left' && image}
      <div className='w-1/2 space-y-5'>{children}</div>
      {side === 'right' && image}
    </div>
  );
}

export { TextBlock };
