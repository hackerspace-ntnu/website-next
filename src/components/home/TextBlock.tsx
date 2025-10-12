import Image from 'next/image';

type TextBlockProps = {
  imgSrc: string;
  imgAlt: string;
  imgSide: 'left' | 'right';
  children: React.ReactNode;
};

function TextBlock({ imgSrc, imgAlt, imgSide, children }: TextBlockProps) {
  const image = (
    <div className='relative min-h-64 shrink-0 lg:w-1/3'>
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
      <div className='mx-auto hidden max-w-7xl justify-between lg:flex lg:gap-20'>
        {imgSide === 'left' && image}
        <div className='my-auto flex-1 space-y-5 pb-3'>{children}</div>
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
