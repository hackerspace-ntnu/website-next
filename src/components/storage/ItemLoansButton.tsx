import { Link } from '@/components/ui/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { ListCheckIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function ItemLoansButton() {
  const t = await getTranslations('storage.loans');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            variant='default'
            size='icon'
            href='/storage/loans'
            aria-label={t('view')}
          >
            <ListCheckIcon />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('view')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { ItemLoansButton };
