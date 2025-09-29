import { z } from 'zod';
import { studyYears } from '@/lib/constants';
import type { Translations } from '@/lib/locale';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';

function applicationSchema(t: Translations) {
  return z.object({
    name: z.string().min(1, t('applications.apply.name.required')),
    email: z.string().email(t('applications.apply.email.invalid')),
    phoneNumber: phoneNumberSchema(t).shape.phoneNumber,
    studyProgram: z
      .string()
      .min(1, t('applications.apply.studyProgram.required')),
    studyYear: z.enum(studyYears),
    learnedAboutUsHow: z
      .string()
      .min(1, t('applications.apply.learnedAboutUsHow.required')),
    about: z.string().min(1, t('applications.apply.about.required')),
    motivation: z.string().min(1, t('applications.apply.motivation.required')),
    groupIdentifier: z
      .string()
      .min(1, t('applications.apply.groupIdentifier.required')),
    otherProjects: z
      .string()
      .min(1, t('applications.apply.otherProjects.required')),
  });
}

export { applicationSchema };
