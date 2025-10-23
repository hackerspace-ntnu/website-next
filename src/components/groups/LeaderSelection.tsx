'use client';

import { useTranslations } from 'next-intl';
import type { Value } from 'platejs';
import { useState } from 'react';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import { withForm } from '@/components/ui/Form';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
import type { RouterOutput } from '@/server/api';

function LoadingChoices() {
  const t = useTranslations('groups.form');
  return (
    <div className='flex items-center justify-center gap-2'>
      <Spinner className='text-primary' />
      <span>{t('loadingMembers')}</span>
    </div>
  );
}

function createChoiceLabel(
  user: RouterOutput['users']['searchMembers'][number],
) {
  return (
    <div className='flex items-center gap-2'>
      <MemberAvatar
        user={user}
        profilePictureUrl={user.profilePictureUrl}
        size='sm'
      />
      <span>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}

type BasicUserInfo = RouterOutput['users']['searchMembers'][number] | null;

const defaultBasicInfo = {
  id: 0,
  firstName: '',
  lastName: '',
  profilePictureId: 0,
  profilePictureUrl: '',
} as BasicUserInfo;

const LeaderSelection = withForm({
  defaultValues: {
    image: null as string | null,
    nameNorwegian: '',
    nameEnglish: '',
    summaryNorwegian: '',
    summaryEnglish: '',
    descriptionNorwegian: [] as Value,
    descriptionEnglish: [] as Value,
    leaderId: null as string | null,
    deputyLeaderId: null as string | null,
    identifier: '',
    internal: false,
    openForApplications: false,
  },
  props: {
    leader: defaultBasicInfo,
    deputyLeader: defaultBasicInfo,
  },
  render: ({ form, leader, deputyLeader }) => {
    const t = useTranslations('groups.form');
    const [search, setSearch] = useState({
      leader: '',
      deputy: '',
    });
    const debouncedSetSearch = useDebounceCallback(setSearch, 500);
    const [chosenLeader, setChosenLeader] = useState<BasicUserInfo>(leader);
    const [chosenDeputy, setChosenDeputy] =
      useState<BasicUserInfo>(deputyLeader);

    const leaderSearch = api.users.searchMembers.useQuery({
      name: search.leader,
      limit: 5,
    });

    const deputySearch = api.users.searchMembers.useQuery({
      name: search.deputy,
      limit: 5,
    });

    // The chosen value must always be in the list of choices
    // Otherwise, it won't be displayed as selected
    if (
      chosenLeader &&
      !leaderSearch.data?.some(
        (user) =>
          user.firstName === chosenLeader.firstName &&
          user.lastName === chosenLeader.lastName,
      )
    ) {
      leaderSearch.data?.push(chosenLeader);
    }

    if (
      chosenDeputy &&
      !deputySearch.data?.some(
        (user) =>
          user.firstName === chosenDeputy.firstName &&
          user.lastName === chosenDeputy.lastName,
      )
    ) {
      deputySearch.data?.push(chosenDeputy);
    }

    const leaderChoices =
      leaderSearch.data?.map((member) => ({
        label: createChoiceLabel(member),
        value: member.id.toString(),
      })) ?? [];

    const deputyChoices =
      deputySearch.data?.map((member) => ({
        label: createChoiceLabel(member),
        value: member.id.toString(),
      })) ?? [];

    return (
      <div className='flex flex-col gap-8 md:flex-row'>
        <form.AppField name='leaderId'>
          {(field) => (
            <field.ComboboxField
              label={t('leader.label')}
              placeholder={t('leader.placeholder')}
              comboboxDescription={t('leader.description')}
              choices={leaderChoices}
              buttonClassName='w-64'
              contentClassName='w-64'
              initialValue={chosenLeader ? chosenLeader.id.toString() : null}
              valueCallback={(value) =>
                setChosenLeader(
                  leaderSearch.data?.find(
                    (member) => member.id.toString() === value,
                  ) ?? null,
                )
              }
              searchCallback={(value) =>
                debouncedSetSearch({ ...search, leader: value })
              }
              emptyMessage={
                leaderSearch.isLoading ? (
                  <LoadingChoices />
                ) : (
                  t('noMembersFound')
                )
              }
              shouldFilter={false}
            />
          )}
        </form.AppField>
        <form.AppField name='deputyLeaderId'>
          {(field) => (
            <field.ComboboxField
              label={t('deputyLeader.label')}
              placeholder={t('deputyLeader.placeholder')}
              comboboxDescription={t('deputyLeader.description')}
              choices={deputyChoices}
              buttonClassName='w-64'
              contentClassName='w-64'
              initialValue={chosenDeputy ? chosenDeputy.id.toString() : null}
              valueCallback={(value) =>
                setChosenDeputy(
                  deputySearch.data?.find(
                    (member) => member.id.toString() === value,
                  ) ?? null,
                )
              }
              searchCallback={(value) =>
                debouncedSetSearch({ ...search, deputy: value })
              }
              emptyMessage={
                deputySearch.isLoading ? (
                  <LoadingChoices />
                ) : (
                  t('noMembersFound')
                )
              }
              shouldFilter={false}
            />
          )}
        </form.AppField>
      </div>
    );
  },
});

export { LeaderSelection };
