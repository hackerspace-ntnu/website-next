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
          className='aspect-square h-full w-full'
          src={photoUrl}
          alt={name}
          sizes='(max-width: 768px) 100%, 100%'
          fill
        />
      )}
      {!photoUrl && <AvatarFallback>{initials}</AvatarFallback>}
    </Avatar>
  );
}

export { AvatarIcon };
