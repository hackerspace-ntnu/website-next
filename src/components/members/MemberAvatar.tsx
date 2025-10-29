import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { cva, cx, type VariantProps } from '@/lib/utils';

const memberAvatarVariants = cva({
  base: 'shrink-0',
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
  profilePictureUrl?: string | null;
  className?: string;
  size?: VariantProps<typeof memberAvatarVariants>['size'];
}) {
  const { firstName, lastName } = user;

  return (
    <div className={cx(memberAvatarVariants({ size }), className)}>
      <Avatar className='h-full w-full'>
        <AvatarImage
          src={profilePictureUrl ?? undefined}
          className='object-cover'
        />
        <AvatarFallback>
          {firstName[0]?.toUpperCase()}
          {lastName[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
export { MemberAvatar };
