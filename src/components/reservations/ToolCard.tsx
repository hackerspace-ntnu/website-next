'use client';
import { Maximize2Icon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';

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
          <div className='h-48 w-full'>
            <Image
              priority
              src={tool.photoUrl}
              alt={tool.title}
              fill
              className='max-h-48 object-cover'
            />
          </div>
          <div className='z-0' title={t('tools.tooltip')}>
            <motion.button
              className='absolute top-2 right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
              key={`cardHeaderButton-${tool.title}-${id}`}
              onClick={onClick}
              whileHover={{ scale: 1.1 }}
            >
              <Maximize2Icon className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
            </motion.button>
          </div>
        </div>
        <div className='mt-2 flex h-full flex-col gap-1 overflow-hidden px-5 text-center'>
          <h1 className='clamp-[text-lg-2xl-clamp] text-wrap'>{tool.title}</h1>
          <h2 className='clamp-[text-sm-lg-clamp] text-center'>
            {tool.description}
          </h2>
          <div className='line-clamp-6 text-left text-clip-3 text-sm'>
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
                <Button className='size-full rounded-t-none text-base-lg-clamp hover:bg-primary'>
                  {t('tools.available')}
                </Button>
              </Link>
            ) : (
              <Button
                variant='destructive'
                className='clamp-[text-base-lg-clamp] pointer-events-none absolute bottom-0 left-0 h-14 w-full rounded-t-none hover:bg-destructive'
              >
                {t('tools.unavailable')}
              </Button>
            )
          ) : (
            <Button
              variant='secondary'
              className='clamp-[text-base-lg-clamp] pointer-events-none absolute bottom-0 left-0 flex h-14 w-full rounded-t-none text-center brightness-90'
            >
              {t('tools.supervision')}
            </Button>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
