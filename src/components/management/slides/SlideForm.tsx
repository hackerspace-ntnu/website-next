'use client';

import { ImageIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { fileToBase64String } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { slideSchema } from '@/validations/management/slides/slideSchema';

type SlideFormProps = {
  slide?: RouterOutput['slides']['fetchSlide'];
};

function SlideForm({ slide }: SlideFormProps) {
  const translations = useTranslations();

  const t = useTranslations('management.slides.form');
  const tApi = useTranslations('management.slides.api');
  const tUi = useTranslations('ui');

  const utils = api.useUtils();
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState(slide?.imageUrl);

  const english = slide?.localizations.find(
    (localization) => localization.locale === 'en-GB',
  );
  const norwegian = slide?.localizations.find(
    (localization) => localization.locale === 'nb-NO',
  );

  const createSlide = api.slides.createSlide.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successCreate'));
      await utils.slides.invalidate();
      router.push('/management/slides');
    },
  });

  const editSlide = api.slides.editSlide.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successEdit'));
      await utils.slides.invalidate();
      router.push('/management/slides');
    },
  });

  const deleteSlideImage = api.slides.deleteSlideImage.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successDeleteImage'));
      setPreviewImage(undefined);
      await utils.slides.invalidate();
      router.refresh();
    },
  });

  const deleteSlide = api.slides.deleteSlide.useMutation({
    onSuccess: async () => {
      toast.success(tApi('successDelete'));
      await utils.slides.invalidate();
      router.push('/management/slides');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: slideSchema(translations),
    },
    defaultValues: {
      image: null as string | null,
      altNorwegian: norwegian?.imgAlt ?? '',
      altEnglish: english?.imgAlt ?? '',
      headingNorwegian: norwegian?.heading ?? '',
      headingEnglish: english?.heading ?? '',
      descriptionNorwegian: norwegian?.description ?? '',
      descriptionEnglish: english?.description ?? '',
      active: slide?.active ?? true,
    },
    onSubmit: ({ value }) => {
      if (slide) {
        return editSlide.mutate({ id: slide.id, ...value });
      }
      createSlide.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='my-4 max-w-prose space-y-8'
    >
      <form.AppField name='image'>
        {(field) => (
          <div className='group relative h-64 w-64 rounded-lg'>
            <field.BaseField label={t('image.label')}>
              <Input
                className='h-58 w-full cursor-pointer rounded-lg border-none opacity-0'
                type='file'
                accept='image/jpeg,image/png'
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64String = await fileToBase64String(file);
                    setPreviewImage(base64String);
                    field.handleChange(base64String);
                  }
                }}
                onBlur={field.handleBlur}
              />
            </field.BaseField>
            <div className='pointer-events-none absolute bottom-0 left-0'>
              {previewImage ? (
                <Image
                  className='h-58 w-64 rounded-lg object-cover'
                  alt={t('image.label')}
                  width='256'
                  height='256'
                  src={previewImage}
                />
              ) : (
                <div className='flex h-58 w-64 items-center justify-center rounded-lg bg-muted'>
                  <ImageIcon className='h-8 w-8' />
                </div>
              )}
            </div>
            <div className='pointer-events-none absolute bottom-0 left-0 flex h-58 w-64 items-center justify-center bg-background/70 opacity-0 transition group-hover:opacity-100'>
              {t('image.upload')}
            </div>
            <Badge className='-bottom-2 -right-2 pointer-events-none absolute rounded-full p-0.5'>
              <UploadIcon className='h-6 w-6' />
            </Badge>
          </div>
        )}
      </form.AppField>
      {slide?.imageId && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>{t('image.delete.label')}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t('image.delete.confirmTitle')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('image.delete.confirmDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
              <AlertDialogActionDestructive
                onClick={() => deleteSlideImage.mutate({ id: slide.id })}
              >
                {tUi('confirm')}
              </AlertDialogActionDestructive>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <form.AppField name='altNorwegian'>
        {(field) => (
          <field.TextField
            label={t('altNorwegian.label')}
            placeholder={t('altNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='altEnglish'>
        {(field) => (
          <field.TextField
            label={t('altEnglish.label')}
            placeholder={t('altEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='headingNorwegian'>
        {(field) => (
          <field.TextField
            label={t('headingNorwegian.label')}
            placeholder={t('headingNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='headingEnglish'>
        {(field) => (
          <field.TextField
            label={t('headingEnglish.label')}
            placeholder={t('headingEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionNorwegian'>
        {(field) => (
          <field.TextField
            label={t('descriptionNorwegian.label')}
            placeholder={t('descriptionNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionEnglish'>
        {(field) => (
          <field.TextField
            label={t('descriptionEnglish.label')}
            placeholder={t('descriptionEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='active'>
        {(field) => <field.CheckboxField label={t('active.label')} />}
      </form.AppField>
      <div className='flex w-full justify-between'>
        <form.AppForm>
          <form.SubmitButton>
            {createSlide.isPending || editSlide.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : slide ? (
              t('editSubmit')
            ) : (
              t('createSubmit')
            )}
          </form.SubmitButton>
        </form.AppForm>
        {slide && (
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
                  onClick={() => deleteSlide.mutate({ id: slide.id })}
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

export { SlideForm };
