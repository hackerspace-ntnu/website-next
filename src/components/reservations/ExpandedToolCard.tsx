'use client';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { Link } from '@/lib/locale/navigation';
import { Minimize2Icon } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useId, useRef } from 'react';

type ExpandedToolCardProps = {
  active: Tool;
  onClose: () => void;
};

function ExpandedToolCard({ active, onClose }: ExpandedToolCardProps) {
  const t = useTranslations('reservations');
  const ref = [useRef<HTMLDivElement | null>(null)];

  const fieldsToShow = [
    'krever',
    'difficulty',
    'filamentSize',
    'filamentType',
    'slicer',
  ] as const;
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

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
          <m.div
            layoutId={`${active.type}-${active.title}-${id}`}
            ref={ref[0]}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.05 },
              scale: { duration: 0.4, delay: 0.05 },
            }}
            className='fixed inset-0 z-30 w-full max-w-96 flex-col place-self-center overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black md:max-w-lg'
          >
            <div>
              <Button
                className='absolute top-2 right-2 size-11 transform rounded-full bg-stone-500 p-0 opacity-90 transition delay-150 duration-300 ease-in-out hover:scale-105'
                onClick={onClose}
              >
                <Minimize2Icon className='size-7 transform stroke-stone-300 transition delay-150 duration-300 ease-in-out hover:scale-90 hover:stroke-stone-200 ' />
              </Button>
              <Image
                src={active.photoUrl}
                alt={active.title}
                width={200}
                height={200}
                className='h-60 w-full object-fill'
              />
            </div>
            <div className='relative mt-2 flex max-h-80 flex-col gap-1 p-2'>
              <div>
                <h1 className='text-lg-2xl-clamp'>{active.title}</h1>
                <h2 className='text-base-lg-clamp'>{active.description}</h2>
              </div>
              <div className='flex h-full max-h-60 flex-col gap-1 overflow-auto px-5 text-left text-sm-base-clamp '>
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
                          {field.charAt(0).toUpperCase() + field.slice(1)}:{' '}
                          {text}
                          <br />
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
            {active.available && (
              <Link
                href={{
                  pathname: '/reservations/[id]',
                  params: { id: active.toolId },
                }}
              >
                <Button
                  variant='default'
                  className='h-12-14-clamp w-full rounded-none font-semibold text-base-lg-clamp'
                >
                  {t('tools.available')}
                </Button>
              </Link>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { ExpandedToolCard };
