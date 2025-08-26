'use client';
import { Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import type { Tool, t } from '@/components/reservations/ToolCardGrid';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';
import { Button } from '../ui/Button';

type ToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const t = useTranslations('reservations');

  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;

  const id = useId();

  return (
    <Card className='relative z-0 flex h-112 w-80 flex-col overflow-hidden rounded-xl hover:brightness-105'>
      <motion.div
        layoutId={`${tool.type}-${tool.title}-${id}`}
        className='z-0 flex h-full flex-col'
      >
        <div className='flex max-h-56 items-center justify-center'>
          <div className='relative h-48 w-full'>
            <Image
              priority
              src={tool.photoUrl}
              alt={tool.title}
              fill
              objectFit='cover'
            />
          </div>
          <div className='z-0' title={t('tools.tooltip')}>
            <motion.button
              className='absolute top-2 right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
              key={`cardHeaderButton-${tool.title}-${id}`}
              onClick={onClick}
              whileHover={{ scale: 1.1 }}
            >
              <Maximize2 className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
            </motion.button>
          </div>
        </div>
        <div className='mt-2 flex h-full flex-col gap-1 px-5 text-left'>
          <h1 className='text-wrap text-center text-lg-xl-clamp'>
            {tool.title}
          </h1>
          <h2 className='text-sm-lg-clamp'>{tool.description}</h2>
          <div className='relative line-clamp-6 max-h-fit text-clip-3 text-xs-sm-clamp'>
            {tool.type === 'printer' &&
              fieldsToShow.map((field) => {
                const text = tool[field];
                if (text === '' || text === 'null' || text === null)
                  return null;
                return (
                  <p key={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}: {text}
                    <br />
                  </p>
                );
              })}
          </div>
          {tool.type === 'printer' ? (
            tool.available ? (
              <Link
                href={{
                  pathname: '/reservations/[id]',
                  params: { id: tool.toolId },
                }}
                className='absolute bottom-0 left-0 h-14 w-full'
              >
                <Button className='size-full rounded-t-none text-base-lg-clamp hover:brightness-110'>
                  {t('tools.available')}
                </Button>
              </Link>
            ) : (
              <Button
                variant='destructive'
                className='pointer-events-none absolute bottom-0 left-0 h-14 w-full rounded-t-none text-base-lg-clamp'
              >
                {t('tools.unavailable')}
              </Button>
            )
          ) : (
            <Button
              variant='secondary'
              className='pointer-events-none absolute bottom-0 left-0 flex h-14 w-full rounded-t-none text-center text-base-lg-clamp brightness-90'
            >
              {t('tools.supervision')}
            </Button>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
