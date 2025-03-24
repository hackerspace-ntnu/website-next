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
  const router = useRouter();
  const utils = api.useUtils();
  const [recurring, setRecurring] = useState(user.recurring);
  const registerShift = api.shiftSchedule.registerShift.useMutation();
  const unregisterShift = api.shiftSchedule.unregisterShift.useMutation();

  const register = user.isMember && !user.onShift;
  const update = user.onShift && user.recurring !== recurring;
  const unregister = !register && !update && user.isMember;

  return (
    <div className={cx(className, 'space-y-3')}>
      <section className='flex gap-2'>
        <Label htmlFor='recurring'>{t.recurring}: </Label>
        <Checkbox
          id='recurribooleanng'
          disabled={!user.isMember}
          checked={recurring}
          onCheckedChange={() => setRecurring(!recurring)}
        />
      </section>
      <DialogClose asChild>
        <Button
          className='float-right'
          variant={unregister ? 'destructive' : 'default'}
          disabled={!user.isMember}
          onClick={() => {
            if (register || update)
              registerShift.mutate({ day, timeslot, recurring });
            else if (unregister) unregisterShift.mutate({ day, timeslot });
            utils.shiftSchedule.fetchShifts.invalidate();
            router.refresh();
          }}
        >
          {register
            ? t.register
            : update
              ? t.update
              : unregister
                ? t.unregister
                : t.register}
        </Button>
      </DialogClose>
    </div>
  );
}

export { RegisterShift };
