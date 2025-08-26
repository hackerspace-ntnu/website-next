'use client';

import { Maximize2Icon } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';

type HorizontalToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

function HorizontalToolCard({ tool, onClick }: HorizontalToolCardProps) {
  const t = useTranslations('reservations');

  const [touched, setTouched] = useState(false);
  const id = useId();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTouched(false);
    }, 1250);

    return () => clearTimeout(timeoutID);
  });

  return (
    <Card
      className='flex h-28 w-full overflow-hidden rounded-xl hover:brightness-105'
      onTouchStart={() => setTouched(true)}
    >
      <m.div
        layoutId={`${tool.type}-${tool.title}-${id}`}
        className='flex h-full w-full flex-row'
      >
        <div className='relative h-full w-44'>
          <Image src={tool.photoUrl} alt={tool.title} fill objectFit='cover' />
        </div>
        <CardContent className='relative flex h-full w-full flex-col items-center justify-center gap-1 text-wrap px-2 text-center'>
          <CardTitle className='mx-6 line-clamp-2 text-balance font-bold text-sm-xl-clamp'>
            {tool.title}
          </CardTitle>
          <AnimatePresence>
            <m.button
              className='absolute top-1 right-1 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
              key={`cardHeaderButton-${tool.title}-${id}`}
              onClick={onClick}
              animate={{ scale: touched ? 1.1 : 1 }}
            >
              <Maximize2Icon className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
            </m.button>
            {touched && (
              <m.div
                key={`cardHeaderToolTip-${tool.title}-${id}`}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: -11 }}
                transition={{ type: 'tween', delay: 0.2 }}
                className='absolute top-1 right-0 z-0 w-48 whitespace-nowrap rounded-xl border border-border bg-popover py-2 pl-2 text-left text-xs-sm-clamp shadow-lg'
              >
                {t('tools.tooltip')}
              </m.div>
            )}
          </AnimatePresence>
          <div className='absolute bottom-0 left-0 w-full'>
            {tool.type === 'printer' ? (
              tool.available ? (
                <Link
                  href={{
                    pathname: '/reservations/[id]',
                    params: { id: tool.toolId },
                  }}
                  className='w-full hover:brightness-110'
                >
                  <Button className='w-full rounded-none'>
                    {t('tools.available')}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant='destructive'
                  className=' pointer-events-none w-full rounded-none '
                >
                  {t('tools.unavailable')}
                </Button>
              )
            ) : (
              <Button
                variant='secondary'
                className=' pointer-events-none w-full rounded-none brightness-90 '
              >
                {t('tools.supervision')}
              </Button>
            )}
          </div>
        </CardContent>
      </m.div>
    </Card>
  );
}

export { HorizontalToolCard };
