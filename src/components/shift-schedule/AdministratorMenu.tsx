'use client';

import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { ChevronDownIcon, ChevronUpIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type AdministratorMenuProps = {
  messages: {
    administratorMenu: string;
    clearShiftSchedule: string;
  };
};

function AdministratorMenu({ messages }: AdministratorMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='mx-auto xs:mx-8 my-8 rounded border p-3'
    >
      <section className='mx-1 flex justify-between'>
        <span className='my-auto font-semibold text-xl'>
          {messages.administratorMenu}
        </span>
        <CollapsibleTrigger asChild>
          <Button variant='ghost'>
            {isOpen ? (
              <ChevronUpIcon
                aria-label='Close Administrator Menu'
                className='size-4'
              />
            ) : (
              <ChevronDownIcon
                aria-label='Open Administrator Menu'
                className='size-4'
              />
            )}
          </Button>
        </CollapsibleTrigger>
      </section>
      <CollapsibleContent className='mt-2'>
        <Button variant='link' className='flex gap-3 text-destructive'>
          <Trash2Icon />
          <span>{messages.clearShiftSchedule}</span>
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { AdministratorMenu };
