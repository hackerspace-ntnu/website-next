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
import { useRouter } from '@/lib/locale/navigation';
import { deleteUnusedEditorFiles } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { ruleSchema } from '@/validations/rules/ruleSchema';

function RuleForm({ rule }: { rule?: RouterOutput['rules']['fetchRule'] }) {
  const t = useTranslations('rules.form');
  const tNew = useTranslations('rules.new');
  const tUpdate = useTranslations('rules.update');
  const tUi = useTranslations('ui');
  const formSchema = ruleSchema(useTranslations());
  const router = useRouter();
  const utils = api.useUtils();

  const createRule = api.rules.createRule.useMutation({
    onSuccess: async (id) => {
      toast.success(tNew('ruleCreated'));
      await utils.rules.fetchRules.invalidate();
      router.push({ pathname: '/rules/[subsetId]', params: { subsetId: id } });
      router.refresh();
    },
  });
  const editRule = api.rules.editRule.useMutation({
    onSuccess: async (id) => {
      toast.success(tUpdate('ruleUpdated'));
      await Promise.all([
        utils.rules.fetchRule.invalidate(id),
        utils.rules.fetchRules.invalidate(),
      ]);
      router.push({ pathname: '/rules/[subsetId]', params: { subsetId: id } });
      router.refresh();
    },
  });
  const deleteRuleImage = api.rules.deleteRuleImage.useMutation({
    onSuccess: async () => {
      toast.success(tUpdate('imageDeleted'));
      await utils.rules.invalidate();
      router.refresh();
    },
  });
  const deleteRule = api.rules.deleteRule.useMutation({
    onSuccess: async () => {
      toast.success(tUpdate('ruleDeleted'));
      await utils.rules.invalidate();
      router.push('/rules');
      router.refresh();
    },
  });
  const deleteFile = api.utils.deleteFile.useMutation();

  const norwegian = rule?.localizations.find((loc) => loc.locale === 'nb-NO');
  const english = rule?.localizations.find((loc) => loc.locale === 'en-GB');

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      image: null as string | null,
      nameNorwegian: norwegian?.name ?? '',
      nameEnglish: english?.name ?? '',
      contentNorwegian: norwegian?.content ?? [],
      contentEnglish: english?.content ?? [],
      internal: rule?.internal ?? false,
    },
    onSubmit: async ({ value }) => {
      if (rule) {
        await deleteUnusedEditorFiles(
          english?.content ?? [],
          value.contentEnglish,
          deleteFile.mutateAsync,
        );
        await deleteUnusedEditorFiles(
          norwegian?.content ?? [],
          value.contentNorwegian,
          deleteFile.mutateAsync,
        );
        return editRule.mutate({
          ...value,
          id: rule.id,
        });
      }
      createRule.mutate(value);
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
        {rule?.imageId && !newImageUploaded && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type='button' variant='destructive'>
                {deleteRuleImage.isPending ? (
                  <Spinner />
                ) : (
                  <span>{tUpdate('deleteRuleImage')}</span>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {tUpdate('deleteRuleImageTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <span>{tUpdate('deleteRuleImageDescription')}</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteRuleImage.mutate({ id: rule.id })}
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
              label={t('name.labelNorwegian')}
              placeholder={t('name.placeholderNorwegian')}
            />
          )}
        </form.AppField>
        <form.AppField name='nameEnglish'>
          {(field) => (
            <field.TextField
              label={t('name.labelEnglish')}
              placeholder={t('name.placeholderEnglish')}
            />
          )}
        </form.AppField>
        <form.AppField name='contentNorwegian'>
          {(field) => <field.EditorField label={t('content.labelNorwegian')} />}
        </form.AppField>
        <form.AppField name='contentEnglish'>
          {(field) => <field.EditorField label={t('content.labelEnglish')} />}
        </form.AppField>
        <form.AppField name='internal'>
          {(field) => (
            <field.CheckboxField
              label={t('internal.label')}
              description={t('internal.description')}
            />
          )}
        </form.AppField>
        <div className='flex justify-between'>
          {rule && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  {deleteRule.isPending ? (
                    <Spinner size='sm' />
                  ) : (
                    <span>{tUpdate('deleteRule')}</span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {tUpdate('deleteRuleTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{tUpdate('deleteRuleDescription')}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                  <AlertDialogActionDestructive
                    onClick={() => deleteRule.mutate({ id: rule.id })}
                  >
                    {tUi('confirm')}
                  </AlertDialogActionDestructive>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <form.SubmitButton
            loading={createRule.isPending || editRule.isPending}
          >
            {rule ? tUpdate('updateRule') : tNew('createRule')}
          </form.SubmitButton>
        </div>
      </form.AppForm>
    </form>
  );
}

export { RuleForm };
