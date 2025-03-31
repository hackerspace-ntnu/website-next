'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import type { t } from '@/components/reservations/ToolCardGrid';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { Minimize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useId, useRef } from 'react';
import { Button } from '../ui/Button';

type ExpandedToolCardProps = {
  active: Tool;
  onClose: () => void;
};

export function ExpandedToolCard({ active, onClose }: ExpandedToolCardProps) {
  const t = useTranslations('reservations');
  const refr = useRef<HTMLDivElement>(null);
  const ref = [refr];
  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
  useOutsideClick(ref, onClose);

  return (
    <AnimatePresence>
      {active && (
        <div className='absolute z-20 size-full'>
          <motion.div
            layoutId={`${active.type}-${active.title}-${id}`}
            ref={refr}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2, delay: 0.05 },
              scale: { duration: 0.2, delay: 0.05 },
            }}
            className='fixed inset-0 z-30 w-full max-w-96 flex-col place-self-center overflow-hidden rounded-2xl border shadow-2xl shadow-black md:max-w-lg dark:bg-neutral-900'
          >
            <div>
              <Button
                className='absolute top-2 right-2 size-11 transform rounded-full bg-stone-500 bg-opacity-40 p-0 transition delay-150 duration-300 ease-in-out hover:scale-105'
                onClick={onClose}
              >
                <Minimize2 className='size-7 transform stroke-stone-300 transition delay-150 duration-300 ease-in-out hover:scale-90 hover:stroke-stone-200 ' />
              </Button>
              <Image
                src={active.photoUrl}
                alt={active.title}
                width={200}
                height={200}
                className='h-60 w-full object-fill'
              />
            </div>
            <div className='relative mt-5 flex max-h-80 flex-col gap-5'>
              <div>
                <h3>{active.title}</h3>
                <p className='~text-sm/base'>{active.description}</p>
              </div>
              <div className='~text-sm/base flex h-full max-h-60 flex-col gap-2 overflow-auto px-5 text-left '>
                {active.textContent}
                <br />
                <div>
                  {active.type === 'printer' &&
                    fieldsToShow.map((field) => {
                      const text = active[field];
                      if (text === '' || text === 'null' || text === null)
                        return;
                      return (
                        <p key={field}>
                          {field}: {text}
                          <br />
                        </p>
                      );
                    })}
                </div>
              </div>
              {active.available && (
                <Button
                  variant='default'
                  className='~text-base/lg size-full rounded-none font-semibold'
                >
                  {t('tools.available')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
