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
import type { RouterOutput } from '@/server/api';
import { newsArticleSchema } from '@/validations/news/newsArticleSchema';

function ArticleForm({
  article,
}: {
  article?: RouterOutput['news']['fetchArticle'];
}) {
  const t = useTranslations('news.form');
  const tUi = useTranslations('ui');
  const formSchema = newsArticleSchema(useTranslations());
  const router = useRouter();

  const newArticle = api.news.newArticle.useMutation({
    onSuccess: (id) => {
      toast.success(t('articleCreated'));
      router.push({ pathname: '/news/[articleId]', params: { articleId: id } });
    },
  });
  const updateArticle = api.news.editArticle.useMutation({
    onSuccess: (id) => {
      toast.success(t('articleUpdated'));
      router.push({ pathname: '/news/[articleId]', params: { articleId: id } });
    },
  });
  const deleteArticleImage = api.news.deleteArticleImage.useMutation({
    onSuccess: () => {
      toast.success(t('articleImageDeleted'));
      router.refresh();
    },
  });
  const deleteArticle = api.news.deleteArticle.useMutation({
    onSuccess: () => {
      toast.success(t('articleDeleted'));
      router.push('/news');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      image: null as string | null,
      titleNorwegian: article?.titleNorwegian ?? '',
      titleEnglish: article?.titleEnglish ?? '',
      contentNorwegian: article?.contentNorwegian ?? '',
      contentEnglish: article?.contentEnglish ?? '',
      internal: article?.internal ?? false,
    },
    onSubmit: ({ value }) => {
      if (article) {
        return updateArticle.mutate({
          ...value,
          id: article.id,
        });
      }

      newArticle.mutate(value);
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
        {article?.imageId && !newImageUploaded && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type='button' variant='destructive'>
                {deleteArticleImage.isPending ? (
                  <Spinner />
                ) : (
                  <span>{t('deleteArticleImage')}</span>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('deleteArticleImageTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <span>{t('deleteArticleImageDescription')}</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteArticleImage.mutate(article.id)}
                >
                  {tUi('confirm')}
                </AlertDialogActionDestructive>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <form.AppField name='titleNorwegian'>
          {(field) => <field.TextField label={t('title.labelNorwegian')} />}
        </form.AppField>
        <form.AppField name='titleEnglish'>
          {(field) => <field.TextField label={t('title.labelEnglish')} />}
        </form.AppField>
        <form.AppField name='contentNorwegian'>
          {(field) => (
            <field.TextAreaField label={t('content.labelNorwegian')} />
          )}
        </form.AppField>
        <form.AppField name='contentEnglish'>
          {(field) => <field.TextAreaField label={t('content.labelEnglish')} />}
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
          {article && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  {deleteArticle.isPending ? (
                    <Spinner />
                  ) : (
                    <span>{t('deleteArticle')}</span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('deleteArticleTitle')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{t('deleteArticleDescription')}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                  <AlertDialogActionDestructive
                    onClick={() => deleteArticle.mutate(article.id)}
                  >
                    {tUi('confirm')}
                  </AlertDialogActionDestructive>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <form.SubmitButton
            loading={newArticle.isPending || updateArticle.isPending}
          >
            {article ? t('updateArticle') : t('createArticle')}
          </form.SubmitButton>
        </div>
      </form.AppForm>
    </form>
  );
}

export { ArticleForm };
