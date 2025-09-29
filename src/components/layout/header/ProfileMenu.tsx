'use client';

import { UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

type ProfileMenuProps = {
  hasUser: boolean;
  isLeadership: boolean;
  t: {
    profile: string;
    signIn: string;
    settings: string;
    management: string;
    signOut: string;
  };
};

function ProfileMenu({ hasUser, isLeadership, t }: ProfileMenuProps) {
  const router = useRouter();
  // We use the pathname from next/navigation instead of next-intl.
  // If we used pathname from next-intl, the dynamic sections wouldn't be filled out,
  // so we would get /events/[eventId], /users/[userId] and so on.
  // We want the actual pathname, language doesn't matter as next-intl will handle it.
  const pathname = usePathname();

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
          className={cx(hasUser && 'text-primary hover:text-primary')}
          title={t.profile}
          aria-label={t.profile}
        >
          <UserIcon className='h-[1.2rem] w-[1.2rem]' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        {hasUser ? (
          <>
            <DropdownMenuItem asChild>
              <Link
                href='/settings'
                className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
              >
                {t.settings}
              </Link>
            </DropdownMenuItem>
            {isLeadership && (
              <DropdownMenuItem asChild>
                <Link
                  href='/management'
                  className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
                >
                  {t.management}
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Button
                onClick={() => signOutMutation.mutate()}
                variant='none'
                size='none'
                className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
              >
                {t.signOut}
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link
              href={{
                pathname: '/auth',
                ...(pathname !== '/' &&
                  pathname !== '/en' && {
                    query: { r: pathname.replace('/en', '') },
                  }),
              }}
              className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
            >
              {t.signIn}
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };
