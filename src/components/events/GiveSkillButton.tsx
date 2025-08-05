'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { RouterOutput } from '@/server/api';

function GiveSkillButton({
  event,
  participant,
}: {
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
  participant: RouterOutput['events']['fetchEventParticipants'][number];
}) {
  const t = useTranslations('events.attendance');
  const router = useRouter();
  const locale = useLocale();
  const giveParticipantSkill = api.events.giveParticipantSkill.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const hasSkillAlready = (
    participant: RouterOutput['events']['fetchEventParticipants'][number],
  ) => {
    return participant.user.usersSkills.some((userSkill) => {
      return userSkill.skillId === event.skill?.id;
    });
  };

  if (!event.skill) return null;

  return (
    <Button
      variant='secondary'
      onClick={() => {
        if (!event.skill) {
          return toast.error(t('notStartedYet'));
        }
        toast.promise(
          giveParticipantSkill.mutateAsync({
            userId: participant.userId,
            skillId: event.skill.id,
          }),
          {
            loading: t('givingSkill', {
              name: `${participant.user.firstName} ${participant.user.lastName}`,
              skill:
                locale === 'en-GB'
                  ? event.skill.nameEnglish
                  : event.skill.nameNorwegian,
            }),
            success: t('successSkill', {
              name: `${participant.user.firstName} ${participant.user.lastName}`,
              skill:
                locale === 'en-GB'
                  ? event.skill.nameEnglish
                  : event.skill.nameNorwegian,
            }),
            error: t('errorSkill', {
              name: `${participant.user.firstName} ${participant.user.lastName}`,
              skill:
                locale === 'en-GB'
                  ? event.skill.nameEnglish
                  : event.skill.nameNorwegian,
            }),
          },
        );
      }}
      disabled={hasSkillAlready(participant)}
    >
      {hasSkillAlready(participant) ? (
        t('skillAttained')
      ) : (
        <>
          <span className='mr-2'>{t('give')}</span>
          <SkillIcon skill={event.skill} />
          <span className='ml-1'>
            {locale === 'en-GB'
              ? event.skill.nameEnglish
              : event.skill.nameNorwegian}
          </span>
        </>
      )}
    </Button>
  );
}

export { GiveSkillButton };
