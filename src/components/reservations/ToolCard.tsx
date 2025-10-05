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

  const button = (() => {
    switch (tool.status) {
      case 'available':
        return (
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
        );
      case 'requires_supervision':
        return (
          <Button
            variant='secondary'
            className='clamp-[text-base-lg-clamp] mt-auto h-14 w-full rounded-t-none'
            disabled
          >
            {t('tools.supervision')}
          </Button>
        );
      case 'out_of_order':
        return (
          <Button
            variant='secondary'
            className='clamp-[text-base-lg-clamp] pointer-events-none mt-auto h-14 w-full rounded-t-none rounded-b-xl'
            disabled
          >
            {t('tools.outOfOrder')}
          </Button>
        );
      default:
        return (
          <Button
            variant='destructive'
            className='clamp-[text-base-lg-clamp] pointer-events-none mt-auto h-14 w-full rounded-t-none'
          >
            {t('tools.unavailable')}
          </Button>
        );
    }
  })();

  return (
    <Card className='group flex h-112 w-80 flex-col gap-2 overflow-hidden rounded-xl'>
      <CardHeader className='p-0'>
        <div className='relative h-44 w-full overflow-hidden'>
          <Image
            priority
            src={tool.imageUrl ?? '/unknown.png'}
            alt={tool.name}
            fill
            className='object-cover duration-150 group-hover:scale-105'
          />
          <m.button
            className='absolute top-2 right-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-stone-500/50 backdrop-blur-sm ease-in-out hover:bg-primary'
            key={`cardHeaderButton-${tool.name}`}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            title={t('tools.tooltip')}
          >
            <Maximize2Icon className='size-6 stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
          </m.button>
        </div>
        <CardTitle className='truncate text-center'>
          <span className='clamp-[text-lg-xl-clamp]'>{tool.name}</span>
          <br />
          <span className='clamp-[text-sm-base-clamp]'>{tool.nickName}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-1 flex-wrap gap-1 overflow-auto px-3'>
        {toolDescriptionFields.map(({ key, label }) => {
          const field = tool[key as keyof Tool];
          const text = field && String(field).trim();

          return (
            text && (
              <span
                key={key}
                className='h-fit w-fit rounded-xl bg-secondary p-1.5 text-sm'
              >
                {t(`tools.${label}`)}: {text}
              </span>
            )
          );
        })}
      </CardContent>

      <CardFooter className='h-fit w-full p-0'>{button}</CardFooter>
    </Card>
  );
}

export { ToolCard };
