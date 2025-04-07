'use client';

import { useResponsiveDialog } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { useAppForm } from '@/components/ui/Form';
import { Link } from '@/components/ui/Link';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';
import { useRouter } from '@/lib/locale/navigation';
import { registerShiftSchema } from '@/validations/shiftSchedule/registerShiftSchema';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type RegisterShiftProps = {
  t: {
    recurring: string;
    register: string;
    update: string;
    unregister: string;
    signIn: string;
    registerSuccess: string;
    updateSuccess: string;
    unregisterSuccess: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  user: {
    isMember: boolean;
    onShift: boolean;
    recurring: boolean;
  };
  className?: string;
};

function RegisterShift({
  t,
  day,
  timeslot,
  user,
  className,
}: RegisterShiftProps) {
  const router = useRouter();

  const utils = api.useUtils();
  const registerShift = api.shiftSchedule.registerShift.useMutation();
  const unregisterShift = api.shiftSchedule.unregisterShift.useMutation();

  const { closeDialog } = useResponsiveDialog();

  const formSchema = registerShiftSchema(useTranslations()).pick({
    recurring: true,
  });
  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      recurring: user.recurring,
    },
    onSubmit: ({ value }) => {
      async function success(message: string) {
        closeDialog();
        toast.success(message);
        await utils.shiftSchedule.fetchShifts.invalidate();
        router.refresh();
      }

      if (canRegister)
        registerShift.mutate(
          { day, timeslot, recurring: value.recurring },
          { onSuccess: () => success(t.registerSuccess) },
        );
      else if (canUpdate)
        registerShift.mutate(
          { day, timeslot, recurring: value.recurring },
          { onSuccess: () => success(t.updateSuccess) },
        );
      else if (canUnregister)
        unregisterShift.mutate(
          { day, timeslot },
          { onSuccess: () => success(t.unregisterSuccess) },
        );
    },
  });

  // Needs recurring state to display correct text on button
  const [recurring, setRecurring] = useState(user.recurring);

  const canRegister = user.isMember && !user.onShift;
  const canUpdate = user.onShift && user.recurring !== recurring;
  const canUnregister = !canRegister && !canUpdate && user.isMember;

  function getButtonText() {
    if (canRegister) return t.register;
    if (canUpdate) return t.update;
    if (canUnregister) return t.unregister;
  }

  return (
    <div className={className}>
      {user.isMember ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className='flex flex-col gap-3'
        >
          <form.AppForm>
            <form.AppField name='recurring'>
              {(field) => (
                <field.CheckboxField
                  onClick={() => setRecurring(!form.getFieldValue('recurring'))}
                  label={t.recurring}
                  className='flex items-center gap-2'
                />
              )}
            </form.AppField>

            <form.SubmitButton
              loading={registerShift.isPending || unregisterShift.isPending}
              variant={canUnregister ? 'destructive' : 'default'}
            >
              {getButtonText()}
            </form.SubmitButton>
          </form.AppForm>
        </form>
      ) : (
        <Link variant='default' size='default' href='/auth'>
          {t.signIn}
        </Link>
      )}
    </div>
  );
}

export { RegisterShift };
