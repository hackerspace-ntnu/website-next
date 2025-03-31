'use client';

import { ResponsiveDialogClose } from '@/components/composites/ResponsiveDialog';
import { useResponsiveDialog } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  useForm,
} from '@/components/ui/Form';
import { Link } from '@/components/ui/Link';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';
import { useRouter } from '@/lib/locale/navigation';
import { useState } from 'react';
import { z } from 'zod';

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

  // Needs recurring state to display correct text on button
  const [recurring, setRecurring] = useState(user.recurring);
  const form = useForm(z.object({ recurring: z.boolean() }), {
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
        <Form onSubmit={form.handleSubmit} className='space-y-3'>
          <form.Field name='recurring'>
            {(field) => (
              <FormItem
                errors={field.state.meta.errors}
                className='flex items-center justify-end gap-2'
              >
                <FormLabel>{t.recurring}</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={() => {
                      field.handleChange(!field.state.value);
                      setRecurring(field.state.value);
                    }}
                    disabled={
                      registerShift.isPending || unregisterShift.isPending
                    }
                    className='cursor-pointer'
                  />
                </FormControl>
              </FormItem>
            )}
          </form.Field>
          <ResponsiveDialogClose asChild>
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  className='float-right w-full'
                  type='submit'
                  variant={canUnregister ? 'destructive' : 'default'}
                  disabled={
                    !canSubmit ||
                    registerShift.isPending ||
                    unregisterShift.isPending
                  }
                >
                  {registerShift.isPending || unregisterShift.isPending ? (
                    <Spinner />
                  ) : (
                    getButtonText()
                  )}
                </Button>
              )}
            </form.Subscribe>
          </ResponsiveDialogClose>
        </Form>
      ) : (
        <Link variant='default' size='default' href='/auth'>
          {t.signIn}
        </Link>
      )}
    </div>
  );
}

export { RegisterShift };
