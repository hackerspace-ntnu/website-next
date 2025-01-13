'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Link } from '@/lib/locale/navigation';
import { UserIcon } from 'lucide-react';

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
        <DropdownMenuItem asChild>
          <Link href='/auth'>{t.signIn}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };
