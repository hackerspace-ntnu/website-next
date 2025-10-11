import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function bannerSchema(t: Translations) {
  return z.object({
    contentNorwegian: z
      .string()
      .min(1, t('management.banners.form.contentNorwegian.required')),
    contentEnglish: z
      .string()
      .min(1, t('management.banners.form.contentEnglish.required')),
    active: z.boolean({ message: t('management.banners.form.active.invalid') }),
    expiresAt: z.date().nullable(),
    pagesMatch: z
      .string()
      .min(1, t('management.banners.form.pagesMatch.required'))
      .regex(
        /^[/a-zA-Z-*,[\]]+$/,
        t('management.banners.form.pagesMatch.charactersInvalid', {
          characters: '/ a-z A-Z - * , [ ]',
        }),
      )
      .regex(
        /^(?!.*(\/\/|--|\*\*|,{2,}|\[{2,}|\]{2,})).+$/,
        t('management.banners.form.pagesMatch.doubleSymbolsInvalid'),
      ),
  });
}

export { bannerSchema };
