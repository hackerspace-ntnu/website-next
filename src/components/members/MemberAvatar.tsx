import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { cva, cx, type VariantProps } from '@/lib/utils';

const memberAvatarVariants = cva({
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-24 w-24',
      xl: 'h-48 w-48',
      '2xl': 'h-64 w-64',
    },
  },
});

function MemberAvatar({
  user,
  profilePictureUrl,
  className,
  size = 'md',
}: {
  user: {
    firstName: string;
    lastName: string;
  };
  profilePictureUrl?: string;
  className?: string;
  size?: VariantProps<typeof memberAvatarVariants>['size'];
}) {
  return (
    <div className={cx(memberAvatarVariants({ size }), className)}>
      <Avatar className='h-full w-full'>
        <AvatarImage src={profilePictureUrl} className='object-cover' />
        <AvatarFallback>
          {user.firstName[0]?.toUpperCase()}
          {user.lastName[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
export { MemberAvatar };
