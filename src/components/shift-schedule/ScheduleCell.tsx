import { ScheduleCellContent } from '@/components/shift-schedule/ScheduleCellContent';
import { ScheduleCellDialog } from '@/components/shift-schedule/ScheduleCellDialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import React from 'react';

type ScheduleCellProps = {
  messages: {
    day: string;
    time: string;
  };
  members: {
    name: string;
  }[];
};

function ScheduleCell({ messages, members }: ScheduleCellProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ScheduleCellContent members={members} />
      </DialogTrigger>
      <DialogContent className='w-1/3 min-w-80 p-3'>
        <ScheduleCellDialog messages={messages} members={members} />
      </DialogContent>
    </Dialog>
  );
}

export { ScheduleCell };
