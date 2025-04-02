'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import type { t } from '@/components/reservations/ToolCardGrid';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';
import { Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { Button } from '../ui/Button';

type HorizontalToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

export function HorizontalToolCard({ tool, onClick }: HorizontalToolCardProps) {
  const t = useTranslations('reservations');
  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;

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
      <motion.div
        layoutId={`${tool.type}-${tool.title}-${id}`}
        className='flex size-full flex-row'
      >
        <Image
          priority
          width={185}
          height={185}
          src={tool.photoUrl}
          alt={tool.title}
          className='w-full max-w-44 shrink object-fill'
        />
        <CardContent className='relative flex size-full flex-col items-center justify-center gap-1 text-wrap px-2 text-center'>
          <CardTitle className='mx-6 line-clamp-2 text-balance font-bold text-sm-xl-clamp'>
            {tool.title}
          </CardTitle>
          <AnimatePresence>
            <motion.button
              className='absolute top-1 right-1 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
              key={`cardHeaderButton-${tool.title}-${id}`}
              onClick={onClick}
              animate={{ scale: touched ? 1.1 : 1 }}
            >
              <Maximize2 className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
            </motion.button>
            {touched && (
              <motion.div
                key={`cardHeaderToolTip-${tool.title}-${id}`}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: -11 }}
                transition={{ type: 'tween', delay: 0.2 }}
                className='absolute top-1 right-0 z-0 w-48 whitespace-nowrap rounded-xl border border-border bg-popover py-2 pl-2 text-left text-xs-sm-clamp shadow-lg'
              >
                {t('tools.tooltip')}
              </motion.div>
            )}
          </AnimatePresence>
          <div className='absolute bottom-0 left-0 flex w-full'>
            {tool.type === 'printer' ? (
              tool.available ? (
                <Link
                  href={{
                    pathname: '/reservations/[tool]',
                    params: { tool: tool.slug },
                  }}
                  className='w-full rounded-none hover:brightness-110'
                >
                  <Button className='w-full'>{t('tools.available')}</Button>
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
      </motion.div>
    </Card>
  );
}
