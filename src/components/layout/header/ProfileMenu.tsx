'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { api } from '@/lib/api/client';
import { Link, useRouter } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import { UserIcon } from 'lucide-react';

type ProfileMenuProps = {
  hasUser: boolean;
  t: {
    profile: string;
    signIn: string;
    settings: string;
    signOut: string;
  };
};

function ProfileMenu({ hasUser, t }: ProfileMenuProps) {
  const router = useRouter();
  const signOutMutation = api.auth.signOut.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={cx(hasUser && 'text-primary')}
        >
          <UserIcon className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{t.profile}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        {hasUser ? (
          <>
            <DropdownMenuItem asChild>
              <Link href='/settings'>{t.settings}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOutMutation.mutate()}>
              {t.signOut}
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href='/auth'>{t.signIn}</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };
