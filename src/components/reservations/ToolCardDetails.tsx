'use client';

import { Minimize2Icon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { ResponsiveDialogWrapper } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { Button } from '@/components/ui/Button';
import { toolDescriptionFields } from '@/lib/constants';
import { Link } from '@/lib/locale/navigation';

type ExpandedToolCardProps = {
  tool: Tool;
  children: React.ReactNode;
};

function ToolCardDetails({ tool, children }: ExpandedToolCardProps) {
  const t = useTranslations('reservations');

  const footerButton = (() => {
    switch (tool.status) {
      case 'available':
        return (
          <Link
            href={{
              pathname: '/reservations/[calendarId]',
              params: { calendarId: tool.toolId },
            }}
            className='h-full w-full'
          >
            <Button className='h-14 w-full rounded-none font-semibold'>
              {t('tools.available')}
            </Button>
          </Link>
        );
      case 'requires_supervision':
        return (
          <Button
            variant='secondary'
            className='h-14 w-full rounded-none'
            disabled
          >
            {t('tools.supervision')}
          </Button>
        );
      case 'out_of_order':
        return (
          <Button
            variant='ring-only'
            className='pointer-events-none h-14 w-full rounded-none'
          >
            {t('tools.outOfOrder')}
          </Button>
        );
      default:
        return (
          <Button
            variant='destructive'
            className='pointer-events-none h-14 w-full rounded-none'
          >
            {t('tools.unavailable')}
          </Button>
        );
    }
  })();

  return (
    <ResponsiveDialogWrapper>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className='overflow-hidden rounded-2xl p-0 shadow-2xl shadow-black'>
        <ResponsiveDialogHeader className='h-fit w-full'>
          <div className='relative h-72 w-full'>
            <Image
              src={tool.imageUrl ?? '/unknown.png'}
              alt={tool.name}
              fill
              className='object-cover'
            />

            <ResponsiveDialogClose asChild>
              <Button className='absolute top-2 right-2 z-10 size-11 rounded-full bg-stone-500 p-0 opacity-90 transition hover:scale-105'>
                <Minimize2Icon className='size-7 stroke-stone-300 transition hover:stroke-stone-200' />
              </Button>
            </ResponsiveDialogClose>
          </div>

          <ResponsiveDialogTitle className='flex h-20 flex-col items-center justify-center text-center'>
            <span className='clamp-[text-xl-2xl-clamp] line-clamp-1'>
              {tool.name}
            </span>
            <span className='clamp-[text-base-xl-clamp] line-clamp-1 opacity-80'>
              {tool.nickName}
            </span>
          </ResponsiveDialogTitle>

          <ResponsiveDialogDescription className='clamp-[text-sm-base-clamp] flex h-44 w-full flex-wrap gap-1 overflow-auto px-5 text-left'>
            <span>{tool.description}</span>
            {toolDescriptionFields.map(({ key, label }) => {
              const field = tool[key as keyof Tool];
              const text = field && String(field).trim();
              return (
                text && (
                  <span
                    key={key}
                    className='h-fit rounded-xl bg-secondary p-2 text-sm'
                  >
                    {t(`tools.${label}`)}: {text}
                  </span>
                )
              );
            })}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter className='h-fit w-full p-0'>
          {footerButton}
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialogWrapper>
  );
}

export { ToolCardDetails };
