'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useLocale } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';
import { api } from '@/lib/api/client';
import { bannerPages } from '@/lib/constants';
import { usePathname } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

function Banner() {
  const path = usePathname();
  const locale = useLocale();

  const fetchBanners = (bannerPages as readonly string[]).includes(path);
  const { data: banners } = api.banners.fetchBanners.useQuery(
    {
      path: path as (typeof bannerPages)[number],
    },
    { enabled: fetchBanners },
  );

  if (!banners || banners.length === 0) return;

  return (
    <div className='-mb-4 relative mt-4'>
      <div
        className={cx(
          'w-screen text-center text-black',
          path === '/' && 'absolute z-10',
        )}
      >
        <Carousel
          opts={{
            loop: true,
            watchDrag: false,
            duration: 50,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className='ml-0'>
            {banners?.map((banner) => {
              const bannerLocalization = banner.localizations.find(
                (localization) => localization.locale === locale,
              );

              return (
                <CarouselItem
                  key={banner.id}
                  className={cx(
                    'flex items-center justify-center bg-yellow-300 py-2 pl-0',
                    banner.className,
                  )}
                >
                  <span className='max-w-4/5'>
                    {bannerLocalization?.content}
                  </span>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export { Banner };
