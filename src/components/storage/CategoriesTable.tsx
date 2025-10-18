import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { CategoriesTableFormRow } from '@/components/storage/CategoriesTableFormRow';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import type { RouterOutput } from '@/server/api';

async function CategoriesTable({
  categories,
}: {
  categories: RouterOutput['storage']['fetchItemCategories'];
}) {
  const t = await getTranslations('storage.categories');

  const { storage, ui } = await getMessages();

  return (
    <NextIntlClientProvider
      messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
    >
      <ScrollArea className='w-full' orientation='horizontal'>
        <Table className='mb-2'>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className='flex items-center justify-between'>
                <span>{t('categoryName')}</span>
                <span>{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <CategoriesTableFormRow key={category.id} category={category} />
            ))}
            <CategoriesTableFormRow />
          </TableBody>
          <TableCaption>{t('categoryTableDescription')}</TableCaption>
        </Table>
      </ScrollArea>
    </NextIntlClientProvider>
  );
}

export { CategoriesTable };
