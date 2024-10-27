import { ScheduleCellContent } from '@/components/shift-schedule/ScheduleCellContent';
import { ScheduleCellDialog } from '@/components/shift-schedule/ScheduleCellDialog';
import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import React from 'react';

function ScheduleCell({ members }: ScheduleCellProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ScheduleCellContent members={members} />
      </DialogTrigger>
      <DialogContent className='w-1/3 min-w-80 p-3'>
        <ScheduleCellDialog members={members} />
      </DialogContent>
    </Dialog>
  );
}

export { ScheduleCell };
