import { EditIcon, Maximize2Icon } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
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
import { Link } from '@/components/ui/Link';
import { toolDescriptionFields } from '@/lib/constants';
import type { RouterOutput } from '@/server/api';

type ToolCardProps = {
  tool: Tool;
  user?: RouterOutput['auth']['state']['user'];
};

async function ToolCard({ tool, user }: ToolCardProps) {
  const t = await getTranslations('reservations');

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
            <Button
              className='absolute top-2 right-2 z-10 size-10 rounded-full bg-stone-500/70 p-0 backdrop-blur-sm transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-primary'
              key={`cardHeaderButton-${tool.name}`}
              title={t('tools.tooltip')}
            >
              <Maximize2Icon className='size-6 stroke-stone-300' />
            </Button>
          </ToolCardDetails>
          {user?.groups.some((g) =>
            ['labops', 'leadership', 'admin'].includes(g),
          ) && (
            <Link
              className='absolute top-14 right-2 z-10 size-10 rounded-full bg-stone-500/70 backdrop-blur-sm transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-primary'
              key={`cardHeaderEditButton-${tool.name}`}
              variant='default'
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
