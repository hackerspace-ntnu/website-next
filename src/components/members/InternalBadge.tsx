import { ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cx } from '@/lib/utils';

import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

type InternalBadgeProps = {
  className?: string;
  internal: boolean;
};

function InternalBadge({ className, internal }: InternalBadgeProps) {
  const t = useTranslations('members');
  if (!internal) return null;
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
            <span tabIndex={0}>
              <ShieldAlert />
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={3}>
          <p>{t('internalArticle')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { InternalBadge };
