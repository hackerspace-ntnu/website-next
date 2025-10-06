'use client';

import { useStore } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
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
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { toolStatus } from '@/lib/constants';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { toolSchema } from '@/validations/reservations/tools/toolSchema';

function ToolForm({ tool }: { tool?: RouterOutput['tools']['fetchTool'] }) {
  const t = useTranslations('reservations.tools.form');
  const tNew = useTranslations('reservations.tools.new');
  const tEdit = useTranslations('reservations.tools.edit');
  const formSchema = toolSchema(useTranslations());
  const tUi = useTranslations('ui');
  const router = useRouter();

  const newTool = api.tools.createTool.useMutation({
    onSuccess: (id) => {
      toast.success(tNew('toolCreated'));
      router.push({
        pathname: '/reservations/[calendarId]',
        params: { calendarId: id },
      });
    },
  });
  const editTool = api.tools.editTool.useMutation({
    onSuccess: (id) => {
      toast.success(tEdit('toolUpdated'));
      router.push({
        pathname: '/reservations/[calendarId]',
        params: { calendarId: id },
      });
    },
  });
  const deleteToolImage = api.tools.deleteToolImage.useMutation({
    onSuccess: () => {
      toast.success(tEdit('imageDeleted'));
      router.refresh();
    },
  });
  const deleteTool = api.tools.deleteTool.useMutation({
    onSuccess: () => {
      toast.success(tEdit('toolDeleted'));
      router.push('/reservations');
    },
  });

  const english = tool
    ? tool.localizations?.find(
        (localization) => localization.locale === 'en-GB',
      )
    : null;

  const norwegian = tool
    ? tool.localizations?.find(
        (localization) => localization.locale === 'nb-NO',
      )
    : null;

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      image: null as string | null,
      type: tool?.type ?? 'other',
      nameNorwegian: norwegian?.name ?? '',
      nameEnglish: english?.name ?? '',
      nickName: tool?.nickName ?? '',
      descriptionNorwegian: norwegian?.description ?? '',
      descriptionEnglish: english?.description ?? '',
      status: tool?.status ?? 'available',
      difficulty: tool?.difficulty ?? '1',
      requires: tool?.requires ?? '',
      filamentSize: tool?.printerSpec?.filamentSize ?? '',
      filamentType: tool?.printerSpec?.filamentType ?? '',
      slicer: tool?.printerSpec?.slicer ?? '',
    },
    onSubmit: ({ value }) => {
      const { difficulty, ...rest } = value;

      if (tool) {
        return editTool.mutate({
          ...rest,
          difficulty: Number(difficulty),
          id: tool.id,
        });
      }

      newTool.mutate({
        ...rest,
        difficulty: Number(difficulty),
      });
    },
  });

  const newImageUploaded = useStore(
    form.store,
    (state) => state.values.image !== null,
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='relative my-6 space-y-10'
    >
      <form.AppForm>
        <form.AppField name='image'>
          {(field) => (
            <field.FileUploadField
              label={t('image.label')}
              description={t('image.description')}
              accept={{
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/png': ['.png'],
              }}
              validator={(value) => formSchema.shape.image.safeParse(value)}
            />
          )}
        </form.AppField>
        {tool?.imageId && !newImageUploaded && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type='button' variant='destructive'>
                {deleteToolImage.isPending ? (
                  <Spinner />
                ) : (
                  <span>{tEdit('deleteToolImage')}</span>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {tEdit('deleteToolImageTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <span>{tEdit('deleteToolImageDescription')}</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteToolImage.mutate({ id: tool.id })}
                >
                  {tUi('confirm')}
                </AlertDialogActionDestructive>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <form.AppField name='type'>
          {(field) => (
            <field.SelectField
              label={t('name.labelNorwegian')}
              placeholder={t('name.placeholder')}
              options={(['3dprinter', 'other'] as const).map((type) => ({
                value: type,
                label: t(`type.${type}`),
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name='nameNorwegian'>
          {(field) => (
            <field.TextField
              label={t('name.labelNorwegian')}
              placeholder={t('name.placeholder')}
            />
          )}
        </form.AppField>
        <form.AppField name='nameEnglish'>
          {(field) => (
            <field.TextField
              label={t('name.labelEnglish')}
              placeholder={t('name.placeholder')}
            />
          )}
        </form.AppField>
        <form.AppField name='nickName'>
          {(field) => (
            <field.TextField
              label={t('nickName.label')}
              placeholder={t('nickName.placeholder')}
            />
          )}
        </form.AppField>
        <form.AppField name='descriptionNorwegian'>
          {(field) => (
            <field.TextAreaField label={t('description.labelNorwegian')} />
          )}
        </form.AppField>
        <form.AppField name='descriptionEnglish'>
          {(field) => (
            <field.TextAreaField label={t('description.labelEnglish')} />
          )}
        </form.AppField>
        <form.AppField name='requires'>
          {(field) => (
            <field.TextField
              label={t('requires.label')}
              description={t('requires.description')}
            />
          )}
        </form.AppField>
        <form.AppField name='status'>
          {(field) => (
            <field.SelectField
              label={t('status.label')}
              description={t('status.description')}
              options={toolStatus.map((status) => ({
                value: status,
                label: t(`status.${status}`),
              }))}
            />
          )}
        </form.AppField>
        <form.Subscribe selector={(state) => state.values.type}>
          {(type) =>
            type === '3dprinter' && (
              <>
                <h3>{t('3dprinterOptions')}</h3>
                <form.AppField name='difficulty'>
                  {(field) => (
                    <field.SelectField
                      label={t('difficultyLevel.label')}
                      description={t('difficultyLevel.description')}
                      options={['1', '2', '3', '4', '5'].map((level) => ({
                        value: level,
                        label: level,
                      }))}
                    />
                  )}
                </form.AppField>
                <form.AppField name='filamentSize'>
                  {(field) => (
                    <field.TextField
                      label={t('filamentSize.label')}
                      description={t('filamentSize.description')}
                    />
                  )}
                </form.AppField>
                <form.AppField name='filamentType'>
                  {(field) => (
                    <field.TextField
                      label={t('filamentType.label')}
                      description={t('filamentType.description')}
                    />
                  )}
                </form.AppField>
                <form.AppField name='slicer'>
                  {(field) => (
                    <field.TextField
                      label={t('slicer.label')}
                      description={t('slicer.description')}
                    />
                  )}
                </form.AppField>
              </>
            )
          }
        </form.Subscribe>
        <div className='flex justify-between'>
          {tool && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  {deleteTool.isPending ? (
                    <Spinner />
                  ) : (
                    <span>{tEdit('deleteTool')}</span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {tEdit('deleteToolTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{tEdit('deleteToolDescription')}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                  <AlertDialogActionDestructive
                    onClick={() => deleteTool.mutate({ id: tool.id })}
                  >
                    {tUi('confirm')}
                  </AlertDialogActionDestructive>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <form.SubmitButton loading={newTool.isPending || editTool.isPending}>
            {tool ? tEdit('updateTool') : tNew('createTool')}
          </form.SubmitButton>
        </div>
      </form.AppForm>
    </form>
  );
}

export { ToolForm };
