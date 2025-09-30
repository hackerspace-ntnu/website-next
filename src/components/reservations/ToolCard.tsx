import { Maximize2Icon } from 'lucide-react';
import { m } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { toolDescriptionFields } from '@/lib/constants';
import { Link } from '@/lib/locale/navigation';

type ToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

function ToolCard({ tool, onClick }: ToolCardProps) {
  const t = useTranslations('reservations');

  return (
    <Card className='flex h-112 w-80 flex-col gap-2 overflow-hidden rounded-xl hover:brightness-105'>
      <CardHeader className='p-0'>
        <div className='relative h-44 w-full'>
          <Image
            priority
            src={tool.imageUrl ?? '/unknown.png'}
            alt={tool.name}
            fill
            className='object-cover'
          />

          <m.button
            className='absolute top-2 right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
            key={`cardHeaderButton-${tool.name}`}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            title={t('tools.tooltip')}
          >
            <Maximize2Icon className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
          </m.button>
        </div>
        <CardTitle className='truncate text-center'>
          <span className='clamp-[text-lg-xl-clamp]'>{tool.name}</span>
          <br />
          <span className='clamp-[text-sm-base-clamp]'>{tool.nickName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-wrap gap-1 overflow-auto px-3'>
        {tool.type === '3dprinter' &&
          toolDescriptionFields.map(({ key, label }) => {
            const text = tool[key as keyof Tool];
            return (
              <span
                key={key}
                className='h-fit w-fit rounded-xl bg-stone-600 p-1 text-sm'
              >
                {t(`tools.${label}`)}: {String(text)}
              </span>
            );
          })}
      </CardContent>
      <CardFooter className='mt-auto h-20 w-full p-0'>
        {tool.type === '3dprinter' ? (
          tool.available ? (
            <Link
              href={{
                pathname: '/reservations/[calendarId]',
                params: { calendarId: tool.toolId },
              }}
              className='mt-auto w-full'
            >
              <Button className='clamp-[text-base-lg-clamp] h-14 w-full rounded-t-none hover:bg-primary'>
                {t('tools.available')}
              </Button>
            </Link>
          ) : (
            <Button
              variant='destructive'
              className='clamp-[text-base-lg-clamp] pointer-events-none mt-auto h-14 w-full rounded-t-none hover:bg-destructive'
            >
              {t('tools.unavailable')}
            </Button>
          )
        ) : (
          <Button
            variant='secondary'
            className='clamp-[text-base-lg-clamp] pointer-events-none mt-auto h-14 w-full rounded-t-none text-center brightness-90'
          >
            {t('tools.supervision')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export { ToolCard };
