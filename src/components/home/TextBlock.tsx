import Image from 'next/image';
import { cx } from '@/lib/utils';

type TextBlockProps = {
  imgSrc: string;
  imgAlt: string;
  imgSide: 'left' | 'right';
  children: React.ReactNode;
};

function TextBlock({ imgSrc, imgAlt, imgSide, children }: TextBlockProps) {
  const image = (
    <div className='relative min-h-64 lg:w-5/12'>
      <Image
        className='min-h-fit rounded-xl object-cover lg:object-contain xl:object-cover'
        src={imgSrc}
        alt={imgAlt}
        fill
        loading='lazy'
      />
    </div>
  );

  return (
    <>
      <div
        className={cx(
          imgSide === 'left' ? 'mr-auto' : 'ml-auto',
          'hidden max-w-6xl justify-between lg:flex',
        )}
      >
        {imgSide === 'left' && image}
        <div className='my-auto w-1/2 space-y-5 pb-3'>{children}</div>
        {imgSide === 'right' && image}
      </div>
      <div className='flex flex-col space-y-5 lg:hidden'>
        {children}
        {image}
      </div>
    </>
  );
}

export { TextBlock };
