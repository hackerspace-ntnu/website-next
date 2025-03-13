import { Link } from '@/components/ui/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function AddItemButton() {
  const t = useTranslations('storage');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            variant='default'
            size='icon'
            href='/storage/item/new'
            aria-label={t('addNewItem')}
          >
            <PlusIcon />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('addNewItem')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { AddItemButton };
