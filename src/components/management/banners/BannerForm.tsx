'use client';

import { revalidateLogic, useStore } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import {
  AlertDialog,
  AlertDialogActionDestructive,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { ExternalLink } from '@/components/ui/Link';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { bannerPages } from '@/lib/constants';
import { useRouter } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import { pagesMatchToRegex } from '@/lib/utils/pagesMatch';
import type { RouterOutput } from '@/server/api';
import { bannerSchema } from '@/validations/banners/bannerSchema';

type BannerFormProps = {
  banner?: RouterOutput['banners']['fetchBanner'];
};

function BannerForm({ banner }: BannerFormProps) {
  const translations = useTranslations();

  const t = useTranslations('management.banners.form');
  const tApi = useTranslations('management.banners.api');
  const tUi = useTranslations('ui');

  const utils = api.useUtils();
  const router = useRouter();

  const english = banner?.localizations.find(
    (localization) => localization.locale === 'en-GB',
  );
  const norwegian = banner?.localizations.find(
    (localization) => localization.locale === 'nb-NO',
  );

  const createBanner = api.banners.createBanner.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successCreate'));
      await Promise.all([
        utils.banners.fetchAllBanners.invalidate(),
        utils.banners.fetchBanners.invalidate(),
      ]);
      router.push('/management/banners');
      router.refresh();
    },
  });

  const editBanner = api.banners.editBanner.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successEdit'));
      await utils.banners.invalidate();
      router.push('/management/banners');
      router.refresh();
    },
  });

  const deleteBanner = api.banners.deleteBanner.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successDelete'));
      await utils.banners.invalidate();
      router.push('/management/banners');
      router.refresh();
    },
  });

  const form = useAppForm({
    validators: {
      onDynamic: bannerSchema(translations),
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      contentNorwegian: norwegian?.content ?? '',
      contentEnglish: english?.content ?? '',
      active: banner?.active ?? true,
      expiresAt: banner?.expiresAt ?? null,
      pagesMatch: banner?.pagesMatch ?? '',
      className: banner?.className ?? '',
    },
    onSubmit: ({ value }) => {
      if (banner) {
        return editBanner.mutate({ id: banner.id, ...value });
      }
      createBanner.mutate(value);
    },
  });

  const pagesRegex = useStore(form.store, (state) => {
    if (state.fieldMeta.pagesMatch?.errors?.length === 0) {
      return pagesMatchToRegex(state.values.pagesMatch);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='my-4 max-w-prose space-y-8'
    >
      <form.AppField name='contentNorwegian'>
        {(field) => (
          <field.TextField
            label={t('contentNorwegian.label')}
            placeholder={t('contentNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='contentEnglish'>
        {(field) => (
          <field.TextField
            label={t('contentEnglish.label')}
            placeholder={t('contentEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='active'>
        {(field) => <field.CheckboxField label={t('active.label')} />}
      </form.AppField>
      <form.AppField name='expiresAt'>
        {(field) => (
          <field.DateTimeField label={t('expiresAt.label')} required={false} />
        )}
      </form.AppField>
      <form.AppField name='pagesMatch'>
        {(field) => (
          <field.TextField
            label={t('pagesMatch.label')}
            placeholder={t('pagesMatch.placeholder')}
            description={t('pagesMatch.description')}
          />
        )}
      </form.AppField>
      <Accordion type='single' collapsible>
        <AccordionItem value='paths'>
          <AccordionTrigger className='-mt-4 cursor-pointer hover:no-underline'>
            {t('pagesMatch.displayLabel')}
          </AccordionTrigger>
          <AccordionContent className='flex flex-wrap gap-2'>
            {bannerPages.map((path) => (
              <div
                key={path}
                className={cx(
                  pagesRegex && path.match(pagesRegex) && 'text-primary',
                )}
              >
                {path}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <form.AppField name='className'>
        {(field) => (
          <field.TextField
            label={t('className.label')}
            placeholder={t('className.placeholder')}
            description={t.rich('className.description', {
              link: (chunks) => (
                <ExternalLink href='https://tailwindcss.com/docs/colors'>
                  {chunks}
                </ExternalLink>
              ),
            })}
          />
        )}
      </form.AppField>
      <div className='flex w-full justify-between'>
        <form.AppForm>
          <form.SubmitButton>
            {createBanner.isPending || editBanner.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : banner ? (
              t('editSubmit')
            ) : (
              t('createSubmit')
            )}
          </form.SubmitButton>
        </form.AppForm>
        {banner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>{t('delete.label')}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('delete.confirmTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('delete.confirmDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteBanner.mutate({ id: banner.id })}
                >
                  {tUi('confirm')}
                </AlertDialogActionDestructive>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
}

export { BannerForm };
