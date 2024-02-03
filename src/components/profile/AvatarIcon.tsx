import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/components/ui/Avatar';

type AvatarIconProps = {
  className?: string;
  photoUrl: string;
  name: string;
  initials: string;
};

function AvatarIcon({ className, photoUrl, name, initials }: AvatarIconProps) {
  return (
    <Avatar className={className}>
      {photoUrl && (
        <Image
          className='object-cover object-center'
          src={photoUrl}
          alt={name}
          width={40}
          height={40}
        />
      )}
      {!photoUrl && <AvatarFallback>{initials}</AvatarFallback>}
    </Avatar>
  );
}

export { AvatarIcon };
