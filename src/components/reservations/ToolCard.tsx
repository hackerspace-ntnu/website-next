'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { ToolCardHeader } from '@/components/reservations/ToolCardHeader';
import { Card } from '@/components/ui/Card';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';

type ToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;
  const t = useTranslations('reservations');
  return (
    <Card className='relative flex h-112 w-80 cursor-pointer flex-col overflow-hidden rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800'>
      <motion.div
        layoutId={tool.id.toString()}
        className='flex h-full flex-col'
      >
        <ToolCardHeader
          onClick={onClick}
          photoTitle={tool.title}
          photoUrl={tool.photoUrl}
        />
        <div className='mt-2 flex h-full flex-col gap-2'>
          <h1 className='text-wrap px-1 text-center text-xl'>{tool.title}</h1>
          <h2 className='~text-base/lg text-center'>{tool.description}</h2>
          <div className='relative max-h-fit text-wrap pl-8 text-left text-sm'>
            {tool.typeId === 1 &&
              fieldsToShow.map((field) => {
                const text = tool[field];
                if (text === '' || text === 'null' || text === null)
                  return null;
                return (
                  <p key={field}>
                    {field}: {text}
                    <br />
                  </p>
                );
              })}
          </div>
          {tool.typeId === 1 ? (
            tool.available ? (
              <Button
                onClick={(e) => e.stopPropagation()}
                className='absolute bottom-0 left-0 h-14 w-full rounded-xl rounded-t-none'
              >
                {t('available')}
              </Button>
            ) : (
              <Button
                variant='destructive'
                onClick={(e) => e.stopPropagation()}
                className='absolute bottom-0 left-0 h-14 w-full rounded-xl rounded-t-none'
              >
                {t('unavailable')}
              </Button>
            )
          ) : (
            <div className='absolute bottom-0 left-0 flex h-14 w-full items-center justify-center rounded-xl rounded-t-none bg-gray-600 bg-opacity-50 text-center'>
              {t('supervision')}
            </div>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
