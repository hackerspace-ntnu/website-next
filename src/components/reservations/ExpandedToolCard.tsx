'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { Minimize2Icon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { toolDescriptionFields } from '@/lib/constants';
import { Link } from '@/lib/locale/navigation';

type ExpandedToolCardProps = {
  currentTool: Tool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseButton: () => void;
};

function ExpandedToolCard({
  currentTool,
  open,
  onOpenChange,
  onCloseButton,
}: ExpandedToolCardProps) {
  const t = useTranslations('reservations');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex w-full max-w-96 flex-col overflow-hidden rounded-2xl p-0 shadow-2xl shadow-black md:max-w-lg'>
        <DialogHeader className='w-full p-0'>
          <div className='relative h-72 w-full'>
            <Image
              src={currentTool.imageUrl ?? '/unknown.png'}
              alt={currentTool.name}
              fill
              className='object-cover'
            />

            <DialogClose asChild>
              <Button
                className='absolute top-2 right-2 z-10 size-11 transform rounded-full bg-stone-500 p-0 opacity-90 transition delay-150 duration-300 ease-in-out hover:scale-105'
                onClick={onCloseButton}
              >
                <Minimize2Icon className='size-7 transform stroke-stone-300 transition delay-150 duration-300 ease-in-out hover:scale-90 hover:stroke-stone-200 ' />
              </Button>
            </DialogClose>
          </div>
          <DialogTitle className='text-center'>
            <span className='clamp-[text-xl-2xl-clamp] truncate'>
              {currentTool.name}
            </span>
            <br />
            <br />
            <span className='clamp-[text-base-xl-clamp]'>
              {currentTool.nickName}
            </span>
          </DialogTitle>
          <DialogDescription className=' flex h-44 flex-col gap-1 overflow-auto px-5 text-left'>
            <span className='clamp-[text-sm-base-clamp]'>
              {currentTool.description}
            </span>
            <br />
            {currentTool.type === '3dprinter' &&
              toolDescriptionFields.map(({ key, label }) => {
                const text = currentTool[key as keyof Tool];
                return (
                  <span
                    key={key}
                    className='h-fit w-fit rounded-xl bg-stone-600 p-1 text-sm'
                  >
                    {t(`tools.${label}`)}: {String(text)}
                  </span>
                );
              })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='h-14 w-full p-0'>
          {currentTool.available && (
            <Link
              href={{
                pathname: '/reservations/[calendarId]',
                params: { calendarId: currentTool.toolId },
              }}
              className='h-full w-full'
            >
              <Button
                variant='default'
                className='clamp-[text-base-lg-clamp] h-full w-full rounded-none font-semibold'
              >
                {t('tools.available')}
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ExpandedToolCard };
