'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { addDays } from 'date-fns';
import { enGB, nb } from 'date-fns/locale';
import { ImageIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { SkillIcon } from '@/components/skills/SkillIcon';
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
import { deleteUnusedEditorFiles, fileToBase64String } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { createEventSchema } from '@/validations/events/createEventSchema';
import { editEventWithoutIdSchema } from '@/validations/events/editEventWithoutIdSchema';

function EditEventForm({
  event,
  skills,
  imageUrl,
}: {
  event?: RouterOutput['events']['fetchEvent'];
  skills: RouterOutput['skills']['fetchAllSkills'];
  imageUrl?: string;
}) {
  const translations = useTranslations();
  const schema = event
    ? editEventWithoutIdSchema(translations)
    : createEventSchema(translations);

  const t = useTranslations('events.form');
  const tUi = useTranslations('ui');
  const tNew = useTranslations('events.new');
  const tEdit = useTranslations('events.edit');
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

  const editEvent = api.events.editEvent.useMutation({
    onSuccess: (event) => {
      toast.success(tEdit('successEdit'));
      router.push({
        pathname: '/events/[eventId]',
        params: { eventId: event.id },
      });
    },
  });

  const deleteEventImage = api.events.deleteEventImage.useMutation({
    onSuccess: () => {
      toast.success(tEdit('successDeleteImage'));
      setPreviewImage(undefined);
      router.refresh();
    },
  });

  const deleteEvent = api.events.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success(tEdit('successDelete'));
      router.push('/events');
    },
  });

  const deleteFile = api.utils.deleteFile.useMutation();

  const form = useAppForm({
    validators: {
      onDynamic: schema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      image: null as string | null,
      nameNorwegian: norwegian?.name ?? '',
      nameEnglish: english?.name ?? '',
      summaryNorwegian: norwegian?.summary ?? '',
      summaryEnglish: english?.summary ?? '',
      descriptionNorwegian: norwegian?.description ?? [],
      descriptionEnglish: english?.description ?? [],
      locationEnglish: english?.location ?? '',
      locationNorwegian: norwegian?.location ?? '',
      startTime: event?.startTime ?? addDays(new Date(), 1),
      setSignUpDeadline: !!event?.signUpDeadline,
      signUpDeadline: event?.signUpDeadline ?? null,
      endTime: event?.endTime ?? addDays(new Date(), 1),
      setMaxParticipants: !!event?.maxParticipants,
      maxParticipants: event?.maxParticipants ?? 0,
      locationMapLink: event?.locationMapLink ?? '',
      internal: event?.internal ?? false,
      skill: event?.skill?.identifier ?? '',
    },
    onSubmit: async ({ value }) => {
      if (event) {
        await deleteUnusedEditorFiles(
          english?.description ?? [],
          value.descriptionEnglish,
          deleteFile.mutateAsync,
        );
        await deleteUnusedEditorFiles(
          norwegian?.description ?? [],
          value.descriptionNorwegian,
          deleteFile.mutateAsync,
        );
        return editEvent.mutate({ id: event.id, ...value });
      }
      createEvent.mutate(value);
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
      {event?.imageId && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>{tEdit('deleteImage')}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {tEdit('deleteImageConfirmTitle')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {tEdit('deleteImageConfirmDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
              <AlertDialogActionDestructive
                onClick={() => deleteEventImage.mutate(event.id)}
              >
                {tUi('confirm')}
              </AlertDialogActionDestructive>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
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
          <field.EditorField label={t('descriptionNorwegian.label')} />
        )}
      </form.AppField>
      <form.AppField name='descriptionEnglish'>
        {(field) => <field.EditorField label={t('descriptionEnglish.label')} />}
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
      <form.AppField name='setSignUpDeadline'>
        {(field) => (
          <field.CheckboxField
            label={t('setSignUpDeadline.label')}
            description={t('setSignUpDeadline.description')}
          />
        )}
      </form.AppField>
      <form.Subscribe selector={(state) => state.values.setSignUpDeadline}>
        {(setSignUpDeadline) =>
          setSignUpDeadline && (
            <form.AppField name='signUpDeadline'>
              {(field) => (
                <field.DateTimeField
                  label={t('signUpDeadline.label')}
                  granularity='minute'
                  locale={locale === 'en-GB' ? enGB : nb}
                />
              )}
            </form.AppField>
          )
        }
      </form.Subscribe>
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
      <form.AppField name='setMaxParticipants'>
        {(field) => (
          <field.CheckboxField
            label={t('setMaxParticipants.label')}
            description={t('setMaxParticipants.description')}
          />
        )}
      </form.AppField>
      <form.Subscribe selector={(state) => state.values.setMaxParticipants}>
        {(setMaxParticipants) =>
          setMaxParticipants && (
            <form.AppField name='maxParticipants'>
              {(field) => (
                <field.NumberField label={t('maxParticipants.label')} />
              )}
            </form.AppField>
          )
        }
      </form.Subscribe>
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
          <form.SubmitButton>
            {createEvent.isPending || editEvent.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : event ? (
              t('editSubmit')
            ) : (
              t('createSubmit')
            )}
          </form.SubmitButton>
        </form.AppForm>
        {event && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>{tEdit('delete')}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {tEdit('deleteConfirmTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {tEdit('deleteConfirmDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteEvent.mutate(event.id)}
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

export { EditEventForm };
