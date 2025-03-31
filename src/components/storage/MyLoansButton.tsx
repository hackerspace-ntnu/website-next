import { Link } from '@/components/ui/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { BookUserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function MyLoansButton() {
  const t = await getTranslations('storage');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            variant='default'
            size='icon'
            href='/storage/loans/user'
            aria-label={t('viewLoans')}
          >
            <BookUserIcon />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('viewLoans')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { MyLoansButton };
