'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useId } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';

type Slide = {
  key: string;
  imgSrc: string;
  imgAlt: string;
  heading: string;
  description: string;
};

function IntroBanner() {
  const slides: Slide[] = [
    {
      key: useId(),
      imgSrc: '/bg.jpg',
      imgAlt: 'Background Image',
      heading: 'Har du en skaper i magen?',
      description:
        'Vi disponerer nødvendig utstyr, lokaler og ikke minst kunnskap for å bistå i ditt neste prosjekt.',
    },
    {
      key: useId(),
      imgSrc: '/event.webp',
      imgAlt: 'Event Image',
      heading: 'Nysgjerrig på VR?',
      description:
        'Uansett om du bare har lyst til å teste det ut, eller er en veteran på VR-utvikling, har vi både utstyr og kompetanse innenfor Virtual Reality på Hackerspace.',
    },
    {
      key: useId(),
      imgSrc: '/mock.jpg',
      imgAlt: 'Mock Image',
      heading: 'Utforsk nye muligheter',
      description: 'Oppdag nye teknologier og samarbeid med likesinnede.',
    },
    {
      key: useId(),
      imgSrc: '/unknown.png',
      imgAlt: 'Unknown Image',
      heading: 'Bli en del av fellesskapet',
      description: 'Bli med i et inkluderende og støttende miljø.',
    },
    {
      key: useId(),
      imgSrc: '/authorMock.jpg',
      imgAlt: 'Author Mock',
      heading: 'Kreativt, innovativt og ikke minst sosialt',
      description:
        'Hackerspace tilbyr en arena for prosjekter, enten det er IoT-dingser, programvare, 3D-printing, eller andre kule ting.',
    },
  ];

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
            {slides.map((slide) => (
              <CarouselItem key={slide.key} className='h-screen w-screen pl-0'>
                <div className='relative h-full w-full'>
                  <Image
                    src={slide.imgSrc}
                    alt={slide.imgAlt}
                    fill
                    className='object-cover'
                  />
                  <div className='-translate-x-1/2 absolute top-1/2 left-1/2 flex w-full transform flex-col gap-3 px-8 text-center'>
                    <h2 className='text-shadow-foreground text-shadow-md text-xl-3xl-clamp dark:text-foreground dark:text-shadow-background'>
                      {slide.heading}
                    </h2>
                    <span className='text-shadow-foreground text-shadow-sm text-sm-lg-clamp dark:text-foreground dark:text-shadow-background'>
                      {slide.description}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
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
