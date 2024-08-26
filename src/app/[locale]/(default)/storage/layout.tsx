import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { ShoppingCart } from 'lucide-react';

export default function StorageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('storage');

  return (
    <>
      <div className='relative'>
        <h1 className='my-4 md:text-center'>{t('title')}</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='absolute right-0 bottom-0 md:right-5'>
                <ShoppingCart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('tooltips.viewShoppingCart')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </>
  );
}
