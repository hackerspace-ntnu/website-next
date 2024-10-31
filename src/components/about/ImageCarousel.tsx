'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React from 'react';

type images = {
  id: string;
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: images[];
};

function ImageCarousel({ images }: ImageCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className='flex w-full max-w-full items-center justify-center'>
      <Carousel
        className='h-auto w-full max-w-2xl'
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className='m-0 flex h-full items-center justify-center p-0'>
                <Image
                  className='max-h-[400px] max-w-full sm:max-h-[600px] lg:max-h-[800px]'
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={600}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
export { ImageCarousel };
