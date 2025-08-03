import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { cva, cx, type VariantProps } from '@/lib/utils';
import type { SelectUser } from '@/server/db/tables';

const memberAvatarVariants = cva({
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-12 w-12',
      lg: 'h-24 w-24',
      xl: 'h-48 w-48',
    },
  },
});

function MemberAvatar({
  user,
  profilePictureUrl,
  className,
  size = 'md',
}: {
  user: SelectUser;
  profilePictureUrl?: string;
  className?: string;
  size?: VariantProps<typeof memberAvatarVariants>['size'];
}) {
  return (
    <div className={cx(memberAvatarVariants({ size }), className)}>
      <Avatar className='h-full w-full'>
        <AvatarImage src={profilePictureUrl} />
        <AvatarFallback>
          {user.firstName[0]?.toUpperCase()}
          {user.lastName[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
export { MemberAvatar };
