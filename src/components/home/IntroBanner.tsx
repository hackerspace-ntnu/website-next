'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import type { Locale } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';
import type { RouterOutput } from '@/server/api';

type IntroBannerProps = {
  slides: RouterOutput['home']['fetchSlides'];
  locale: Locale;
};

function IntroBanner({ slides, locale }: IntroBannerProps) {
  return (
    <>
      <div className='absolute top-0 left-0 text-background'>
        <Carousel
          opts={{
            loop: true,
            watchDrag: false,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className='ml-0 h-screen w-screen'>
            {slides.map((slide) => {
              const slideLocalization = slide.localizations.find(
                (localization) => localization.locale === locale,
              );

              return (
                <CarouselItem key={slide.id} className='h-screen w-screen pl-0'>
                  <div className='relative h-full w-full'>
                    <Image
                      src={slide.imageUrl ?? '/bg.jpg'}
                      alt={slideLocalization?.imgAlt ?? 'No image available'}
                      fill
                      className='object-cover'
                    />
                    <div className='-translate-x-1/2 absolute top-1/2 left-1/2 flex w-full transform flex-col gap-3 px-8 text-center'>
                      <h2 className='text-shadow-foreground text-shadow-md text-xl-3xl-clamp dark:text-foreground dark:text-shadow-background'>
                        {slideLocalization?.heading}
                      </h2>
                      <span className='text-shadow-foreground text-shadow-sm text-sm-lg-clamp dark:text-foreground dark:text-shadow-background'>
                        {slideLocalization?.description}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-full transform text-center text-4xl-7xl-clamp text-shadow-foreground text-shadow-lg dark:text-foreground dark:text-shadow-background'>
          Hackerspace NTNU
        </h1>
      </div>
      {/* Above div is absolute, div below is used to offset content below intro banner */}
      <div className='h-[calc(100vh-5rem)]' />
    </>
  );
}

export { IntroBanner };
