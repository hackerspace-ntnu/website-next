import { Maximize2Icon } from 'lucide-react';
import { m } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Tool } from '@/components/reservations/ToolCardGrid';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';

type HorizontalToolCardProps = {
  tool: Tool;
  onClick: () => void;
};

function HorizontalToolCard({ tool, onClick }: HorizontalToolCardProps) {
  const t = useTranslations('reservations');

  return (
    <Card className='flex h-30 w-full overflow-hidden rounded-xl hover:brightness-105'>
      <CardHeader className='relative h-full w-40 flex-shrink-0'>
        <Image
          src={tool.imageUrl ?? '/unknown.png'}
          alt={tool.name}
          fill
          className='object-cover'
        />
      </CardHeader>
      <CardContent className='relative flex h-full w-full flex-col items-center justify-center p-0 text-center'>
        <m.button
          title={t('tools.tooltip')}
          className='absolute top-1 right-1 z-10 mx-auto inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm ease-in-out hover:bg-primary'
          key={`cardHeaderButton-${tool.name}-${tool.toolId}`}
          onClick={onClick}
        >
          <Maximize2Icon className='size-6 transform stroke-stone-300 transition delay-75 duration-300 ease-in-out hover:scale-110' />
        </m.button>
        <CardTitle className='line-clamp-1 text-lg'>{tool.name}</CardTitle>
        <div className='absolute bottom-0 left-0 w-full'>
          {tool.type === '3dprinter' ? (
            tool.available ? (
              <Link
                href={{
                  pathname: '/reservations/[calendarId]',
                  params: { calendarId: tool.toolId },
                }}
                className='w-full hover:brightness-110'
              >
                <Button className='w-full rounded-none'>
                  {t('tools.available')}
                </Button>
              </Link>
            ) : (
              <Button
                variant='destructive'
                className='pointer-events-none w-full rounded-none '
              >
                {t('tools.unavailable')}
              </Button>
            )
          ) : (
            <Button
              variant='secondary'
              className='pointer-events-none w-full rounded-none brightness-90 '
            >
              {t('tools.supervision')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { HorizontalToolCard };
