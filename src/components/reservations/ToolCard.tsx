'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import type { t } from '@/components/reservations/ToolCardGrid';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';
import { Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useId, useState } from 'react';
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
  const [hovered, setHovered] = useState(false);
  const id = useId();

  return (
    <Card className='relative z-0 flex h-112 w-80 flex-col overflow-hidden rounded-xl hover:brightness-110'>
      <motion.div
        layoutId={`${tool.type}-${tool.title}-${id}`}
        className='z-0 flex h-full flex-col'
      >
        <div
          className='flex max-h-56 items-center justify-center hover:brightness-110'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            width={185}
            height={185}
            src={tool.photoUrl}
            alt={tool.title}
            className='h-48 w-full rounded-t-g object-fill'
          />
          <div className='z-0'>
            <motion.button
              className='absolute top-2 right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
              key={`cardHeaderButton-${tool.title}-${id}`}
              onClick={onClick}
              animate={{ scale: hovered ? 1.1 : 1 }}
            >
              <Maximize2 className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
            </motion.button>
            {hovered && (
              <motion.div
                key={`cardHeaderToolTip-${tool.title}-${id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: -4 }}
                transition={{ type: 'tween', delay: 0.2 }}
                className='~text-xs/sm absolute top-3 right-11 z-0 whitespace-nowrap rounded-xl rounded-r-none bg-black bg-opacity-40 px-3 py-2 pr-4 text-white shadow-lg'
              >
                {t('tools.tooltip')}
              </motion.div>
            )}
          </div>
        </div>
        <div className='mt-2 flex h-full flex-col gap-2'>
          <h1 className='text-wrap px-1 text-center text-xl'>{tool.title}</h1>
          <h2 className='~text-base/lg text-center'>{tool.description}</h2>
          <div className='relative max-h-fit text-wrap pl-8 text-left text-sm'>
            {tool.type === 'printer' &&
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
          {tool.type === 'printer' ? (
            tool.available ? (
              <Link
                href={{
                  pathname: '/reservations/[tool]',
                  params: { tool: tool.slug },
                }}
                className='absolute bottom-0 left-0 h-14 w-full'
              >
                <Button className='h-full w-full rounded-xl rounded-t-none hover:brightness-125'>
                  {t('tools.available')}
                </Button>
              </Link>
            ) : (
              <Button
                variant='destructive'
                className='pointer-events-none absolute bottom-0 left-0 h-14 w-full rounded-xl rounded-t-none'
              >
                {t('tools.unavailable')}
              </Button>
            )
          ) : (
            <div className='absolute bottom-0 left-0 flex h-14 w-full items-center justify-center rounded-xl rounded-t-none bg-gray-600 bg-opacity-50 text-center'>
              {t('tools.supervision')}
            </div>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
