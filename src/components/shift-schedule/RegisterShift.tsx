'use client';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';
import { useRouter } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import { useState } from 'react';
import { DialogClose } from '../ui/Dialog';

type RegisterShiftProps = {
  t: {
    recurring: string;
    register: string;
    update: string;
    unregister: string;
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
  const [recurring, setRecurring] = useState(user.recurring);

  const router = useRouter();

  const utils = api.useUtils();
  const registerShift = api.shiftSchedule.registerShift.useMutation();
  const unregisterShift = api.shiftSchedule.unregisterShift.useMutation();

  const canRegister = user.isMember && !user.onShift;
  const canUpdate = user.onShift && user.recurring !== recurring;
  const canUnregister = !canRegister && !canUpdate && user.isMember;

  function getButtonText() {
    if (canRegister) return t.register;
    if (canUpdate) return t.update;
    if (canUnregister) return t.unregister;
    return t.register; // Show disabled register for users that aren't logged in
  }

  return (
    <div className={cx(className, 'space-y-3')}>
      <section className='flex gap-2'>
        <Label htmlFor='recurring'>{t.recurring}: </Label>
        <Checkbox
          id='recurring'
          disabled={!user.isMember}
          checked={recurring}
          onCheckedChange={() => setRecurring(!recurring)}
        />
      </section>
      <DialogClose asChild>
        <Button
          className='float-right'
          variant={canUnregister ? 'destructive' : 'default'}
          disabled={!user.isMember}
          onClick={async () => {
            if (canRegister || canUpdate) {
              await registerShift.mutateAsync({ day, timeslot, recurring });
            } else if (canUnregister) {
              await unregisterShift.mutateAsync({ day, timeslot });
            }

            await utils.shiftSchedule.fetchShifts.invalidate();
            router.refresh();
          }}
        >
          {getButtonText()}
        </Button>
      </DialogClose>
    </div>
  );
}

export { RegisterShift };
