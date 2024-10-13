'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { UserIcon } from 'lucide-react';
import * as React from 'react';

function ProfileMenu({ t }: { t: { profile: string; signIn: string } }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <UserIcon className='h-[1.2rem] w-[1.2rem] text-primary' />
          <span className='sr-only'>{t.profile}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        <DropdownMenuItem>{t.signIn}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };
