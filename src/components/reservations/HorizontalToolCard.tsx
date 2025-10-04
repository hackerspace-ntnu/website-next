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

  const footerButton = (() => {
    switch (tool.status) {
      case 'available':
        return (
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
        );
      case 'requires_supervision':
        return (
          <Button variant='secondary' className='w-full rounded-none' disabled>
            {t('tools.supervision')}
          </Button>
        );
      case 'out_of_order':
        return (
          <Button
            variant='ring-only'
            className='pointer-events-none w-full rounded-none'
          >
            {t('tools.outOfOrder')}
          </Button>
        );
      default:
        return (
          <Button
            variant='destructive'
            className='pointer-events-none w-full rounded-none'
          >
            {t('tools.unavailable')}
          </Button>
        );
    }
  })();

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
          className='absolute top-1 right-1 z-10 inline-flex size-9 items-center justify-center rounded-full bg-stone-500/50 backdrop-blur-sm ease-in-out hover:bg-primary'
          key={`cardHeaderButton-${tool.name}-${tool.toolId}`}
          onClick={onClick}
          whileHover={{ scale: 1.08 }}
        >
          <Maximize2Icon className='size-6 stroke-stone-300 transition' />
        </m.button>

        <CardTitle className='line-clamp-1 text-lg'>{tool.name}</CardTitle>

        <div className='absolute bottom-0 left-0 w-full'>{footerButton}</div>
      </CardContent>
    </Card>
  );
}

export { HorizontalToolCard };
