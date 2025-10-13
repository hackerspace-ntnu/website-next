import { EditIcon, Maximize2Icon } from 'lucide-react';
import { m } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ToolCardDetails } from '@/components/reservations/ToolCardDetails';
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
import type { RouterOutput } from '@/server/api';

type ToolCardProps = {
  tool: Tool;
  user?: RouterOutput['auth']['state']['user'];
};

function ToolCard({ tool, user }: ToolCardProps) {
  const t = useTranslations('reservations');

  const button = (() => {
    switch (tool.status) {
      case 'available':
        return (
          <Link
            href={{
              pathname: '/reservations/[toolId]',
              params: { toolId: tool.toolId },
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
          <ToolCardDetails tool={tool}>
            <m.button
              className='absolute top-2 right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-stone-500/50 backdrop-blur-sm hover:bg-primary'
              key={`cardHeaderButton-${tool.name}`}
              whileHover={{ scale: 1.05 }}
              title={t('tools.tooltip')}
            >
              <Maximize2Icon className='size-6 stroke-stone-300' />
            </m.button>
          </ToolCardDetails>
          {user?.groups.some((g) =>
            ['labops', 'leadership', 'admin'].includes(g),
          ) && (
            <Link
              className='absolute top-14 right-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-stone-500/50 backdrop-blur-sm duration-150 ease-in-out hover:scale-105 hover:bg-primary'
              key={`cardHeaderEditButton-${tool.name}`}
              href={{
                pathname: '/reservations/tools/[toolId]/edit',
                params: { toolId: tool.toolId },
              }}
              title={t('tools.tooltip')}
            >
              <EditIcon className='size-6 stroke-stone-300' />
            </Link>
          )}
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
