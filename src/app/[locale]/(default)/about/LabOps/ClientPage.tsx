"use client";

import { useTranslations } from 'next-intl';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/Carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import React from 'react';

const images = [
  { src: "/unknown.png", alt: "unknown", width: 600, height: 400 },
  { src: "/mock.jpg", alt: "mock", width: 600, height: 400 },
  { src: "/bg.jpg", alt: "bg", width: 600, height: 400 },
  { src: "/about/pizzaWolfs-min.png", alt: "pizzaWolfs", width: 600, height: 400 },
];

export default function ClientPage({ locale }: { locale: string }) {
  const t = useTranslations('labops');
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
      <div className='flex items-center justify-center w-full max-w-full'>
        <Carousel
          className="w-full max-w-2xl h-auto"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className='flex items-center justify-center h-full p-0 m-0'>
                  <Image 
                    className='max-w-full max-h-[400px] sm:max-h-[600px] lg:max-h-[800px]'
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
  )
}