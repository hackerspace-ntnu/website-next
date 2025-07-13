'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';

function IntroBanner() {
  const images = [
    <img key={1} src='/bg.jpg' alt='...' />,
    <img key={2} src='/mock.jpg' alt='...' />,
    <img key={3} src='/bg.jpg' alt='...' />,
    <img key={4} src='/event.webp' alt='...' />,
  ];

  return (
    <>
      <div className='absolute top-0 left-0'>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className='ml-0 h-screen w-screen'>
            {images.map((image) => (
              <CarouselItem key={image.key} className='h-screen w-screen pl-0'>
                {image}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <h1 className='-translate-x-1/2 -translate-y-1/2 ~sm/2xl:~text-4xl/7xl absolute top-5/12 left-1/2 w-full transform gap-5 text-center text-background text-shadow-foreground text-shadow-md dark:text-foreground dark:text-shadow-background'>
          Hackerspace NTNU
        </h1>
      </div>
      <div className='h-[calc(100vh-5rem)]' />
    </>
  );
}

export { IntroBanner };
