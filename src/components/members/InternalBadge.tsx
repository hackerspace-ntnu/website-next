import { ShieldAlert } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cx } from '@/lib/utils';

type InternalBadgeProps = {
  className?: string;
};

async function InternalBadge({ className }: InternalBadgeProps) {
  const t = await getTranslations('members');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cx(
              className,
              'absolute z-10 m-1 bg-accent/95 p-0.5 backdrop-blur focus-visible:ring-offset-0 supports-[backdrop-filter]:bg-accent/60',
            )}
            asChild
            variant='ghost'
            size='xs-icon'
          >
            <span>
              <ShieldAlert />
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={3}>
          <p>{t('internalMember')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { InternalBadge };
