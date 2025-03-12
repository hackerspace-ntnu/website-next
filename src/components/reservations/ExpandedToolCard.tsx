'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import type { t } from '@/components/reservations/ToolCardGrid';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { Minimize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

type ExpandedToolCardProps = {
  active: Tool;
  onClose: () => void;
  t: t;
};

export function ExpandedToolCard({
  active,
  onClose,
  t,
}: ExpandedToolCardProps) {
  const refr = useRef<HTMLDivElement>(null);
  const ref = [refr];
  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;

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
        <div className='absolute z-20 size-full opacity-95'>
          <motion.div
            layoutId={active.id.toString()}
            ref={refr}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2, delay: 0.05 },
              scale: { duration: 0.2, delay: 0.05 },
            }}
            className='fixed inset-0 z-30 w-full max-w-96 flex-col place-self-center overflow-hidden rounded-2xl border bg-white shadow-black shadow-xl md:max-w-lg dark:bg-neutral-900'
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
            <div className='relative flex h-80 flex-col gap-1 p-6 pt-4 pr-1'>
              <div className='inline-flex flex-row gap-3'>
                <div className='w-2/3'>
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                </div>
                {active.available && (
                  <Button
                    variant='default'
                    className='~text-base/lg mr-4 inline-flex w-1/3 max-w-64 overflow-hidden rounded-xl font-semibold'
                  >
                    Reserver
                  </Button>
                )}
              </div>
              <div className='~text-xs/sm flex h-full max-h-60 flex-col gap-2 overflow-auto pt-4 text-neutral-600 dark:text-neutral-400'>
                {active.textContent}
                <div>
                  {active.typeId === 1 &&
                    fieldsToShow.map((field) => {
                      const text = active[field];
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
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
