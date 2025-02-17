'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { useOutsideClick } from '@/lib/hooks/useOutside-click';
import { Minimize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

type ExpandedToolCardProps = {
  active: Tool;
  onClose: () => void;
};

export function ExpandedToolCard({ active, onClose }: ExpandedToolCardProps) {
  const ref = useRef<HTMLDivElement>(null);

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
        <div className='absolute z-10 size-full'>
          <motion.div
            layoutId={active.id.toString()}
            ref={ref}
            className='~mx-4/2 fixed inset-0 z-20 max-w-lg flex-col place-self-center overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 '
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

            <div className='relative inline-flex h-80 flex-col gap-1 p-6 pt-4 pr-1'>
              <div className='inline-flex flex-row gap-3'>
                <div className='w-2/3'>
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                </div>
                {active.available && (
                  <Button className='~text-xs/md w-1/3 max-w-64 rounded-xl '>
                    Reserver
                  </Button>
                )}
              </div>
              <div className='max-h-36 overflow-auto pt-4 text-neutral-600 text-sm md:max-h-72 dark:text-neutral-400'>
                {active.textContent}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
