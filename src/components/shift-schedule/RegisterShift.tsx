'use client';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';
import { cx } from '@/lib/utils';
import { useState } from 'react';

type RegisterShiftProps = {
  t: {
    recurring: string;
    register: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  className?: string;
};

function RegisterShift({ t, day, timeslot, className }: RegisterShiftProps) {
  const [recurring, setRecurring] = useState(false);
  const registerShift = api.shiftSchedule.registerShift.useMutation();

  return (
    <div className={cx(className, 'space-y-3')}>
      <section className='flex gap-2'>
        <Label htmlFor='recurring'>{t.recurring}: </Label>
        <Checkbox
          id='recurring'
          checked={recurring}
          onCheckedChange={() => setRecurring(!recurring)}
        />
      </section>
      <Button
        className='float-right'
        onClick={() => registerShift.mutateAsync({ day, timeslot, recurring })}
      >
        {t.register}
      </Button>
    </div>
  );
}

export { RegisterShift };
