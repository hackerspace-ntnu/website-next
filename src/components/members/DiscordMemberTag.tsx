'use client';
import { DiscordIcon } from '@/components/assets/icons';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toaster';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import type { RouterOutput } from '@/server/api';

function DiscordMemberTag({
  user,
  t,
}: {
  user: NonNullable<RouterOutput['users']['fetchMember']>;
  t: { discordTag: string; usernameCopied: string };
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm-icon'
            onClick={() => {
              navigator.clipboard.writeText(user.discordUsername as string);
              toast.info(t.usernameCopied);
            }}
          >
            <DiscordIcon className='h-6 w-6 text-black dark:text-white' />
          </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-background'>
          <p>{user.discordUsername}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { DiscordMemberTag };
