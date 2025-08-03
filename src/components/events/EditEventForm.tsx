'use client';

import { enGB, nb } from 'date-fns/locale';
import { ImageIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Badge } from '@/components/ui/Badge';
import { useAppForm } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { fileToBase64String } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { editEventSchema } from '@/validations/events/editEventSchema';

function EditEventForm({
  event,
  skills,
  imageUrl,
}: {
  event?: RouterOutput['events']['fetchEvent'];
  skills: RouterOutput['skills']['fetchAllSkills'];
  imageUrl?: string;
}) {
  const schema = editEventSchema(useTranslations());
  const t = useTranslations('events.form');
  const tNew = useTranslations('events.new');
  const locale = useLocale();
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState(imageUrl);

  const english = event?.localizations.find(
    (localization) => localization.locale === 'en-GB',
  );
  const norwegian = event?.localizations.find(
    (localization) => localization.locale === 'nb-NO',
  );

  const createEvent = api.events.createEvent.useMutation({
    onSuccess: (event) => {
      toast.success(tNew('success'));
      router.push({
        pathname: '/events/[eventId]',
        params: { eventId: event.id },
      });
    },
  });

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      image: null as string | null,
      nameNorwegian: norwegian?.name ?? '',
      nameEnglish: english?.name ?? '',
      summaryNorwegian: norwegian?.summary ?? '',
      summaryEnglish: english?.summary ?? '',
      descriptionNorwegian: norwegian?.description ?? '',
      descriptionEnglish: english?.description ?? '',
      locationEnglish: english?.location ?? '',
      locationNorwegian: norwegian?.location ?? '',
      startTime: event?.startTime ?? new Date(),
      endTime: event?.endTime ?? new Date(),
      locationMapLink: event?.locationMapLink ?? '',
      internal: event?.internal ?? false,
      skill: event?.skill?.identifier ?? '',
    },
    onSubmit: ({ value }) => {
      createEvent.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='max-w-prose space-y-8'
    >
      <form.AppField name='image'>
        {(field) => (
          <div className='group relative h-64 w-64 rounded-lg'>
            <field.BaseField label={t('image.label')}>
              <Input
                className='h-58 w-full cursor-pointer rounded-lg border-none'
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
      <form.AppField name='nameNorwegian'>
        {(field) => (
          <field.TextField
            label={t('nameNorwegian.label')}
            placeholder={t('nameNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='nameEnglish'>
        {(field) => (
          <field.TextField
            label={t('nameEnglish.label')}
            placeholder={t('nameEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='summaryNorwegian'>
        {(field) => (
          <field.TextAreaField
            label={t('summaryNorwegian.label')}
            placeholder={t('summaryNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='summaryEnglish'>
        {(field) => (
          <field.TextAreaField
            label={t('summaryEnglish.label')}
            placeholder={t('summaryEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionNorwegian'>
        {(field) => (
          <field.TextAreaField
            label={t('descriptionNorwegian.label')}
            placeholder={t('descriptionNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionEnglish'>
        {(field) => (
          <field.TextAreaField
            label={t('descriptionEnglish.label')}
            placeholder={t('descriptionEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='locationNorwegian'>
        {(field) => (
          <field.TextField
            label={t('locationNorwegian.label')}
            placeholder={t('locationNorwegian.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='locationEnglish'>
        {(field) => (
          <field.TextField
            label={t('locationEnglish.label')}
            placeholder={t('locationEnglish.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='locationMapLink'>
        {(field) => (
          <field.TextField
            label={t('locationMapLink.label')}
            description={t('locationMapLink.description')}
            placeholder={t('locationMapLink.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='startTime'>
        {(field) => (
          <field.DateTimeField
            label={t('startTime.label')}
            granularity='minute'
            locale={locale === 'en-GB' ? enGB : nb}
          />
        )}
      </form.AppField>
      <form.AppField name='endTime'>
        {(field) => (
          <field.DateTimeField
            label={t('endTime.label')}
            granularity='minute'
            locale={locale === 'en-GB' ? enGB : nb}
          />
        )}
      </form.AppField>
      <form.AppField name='internal'>
        {(field) => (
          <field.CheckboxField
            label={t('internal.label')}
            description={t('internal.description')}
          />
        )}
      </form.AppField>
      <form.AppField name='skill'>
        {(field) => (
          <field.SelectField
            label={t('skill.label')}
            description={t('skill.description')}
            placeholder={t('skill.placeholder')}
            required={false}
            options={skills.map((skill) => ({
              value: skill.identifier,
              label: (
                <div className='flex items-center gap-2'>
                  <SkillIcon skill={skill} size='small' />
                  <span>
                    {locale === 'en-GB'
                      ? skill.nameEnglish
                      : skill.nameNorwegian}
                  </span>
                </div>
              ),
            }))}
          />
        )}
      </form.AppField>
      <div className='flex w-full justify-between'>
        <form.AppForm>
          <form.SubmitButton>{t('submit')}</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}

export { EditEventForm };
