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
    unregister: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  user: {
    authenticated: boolean;
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

  return (
    <div className={cx(className, 'space-y-3')}>
      <section className='flex gap-2'>
        <Label htmlFor='recurring'>{t.recurring}: </Label>
        <Checkbox
          id='recurribooleanng'
          disabled={!user.authenticated}
          checked={recurring}
          onCheckedChange={() => setRecurring(!recurring)}
        />
      </section>
      <DialogClose asChild>
        <Button
          className='float-right'
          disabled={!user.authenticated}
          onClick={() => {
            registerShift.mutate({ day, timeslot, recurring });
            utils.shiftSchedule.fetchShifts.invalidate();
            router.refresh();
          }}
        >
          {t.register}
        </Button>
      </DialogClose>
    </div>
  );
}

export { RegisterShift };
