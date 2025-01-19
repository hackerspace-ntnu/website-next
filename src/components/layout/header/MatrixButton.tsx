import { ExternalLink } from '@/components/composites/Link';
import { MessageSquareMoreIcon } from 'lucide-react';

type MatrixButtonProps = {
  className?: string;
  t: {
    title: string;
  };
};

function MatrixButton({ className, t }: MatrixButtonProps) {
  return (
    <ExternalLink
      variant='ghost'
      size='icon'
      className={className}
      href='/' // Temporary, don't know the actual link yet
      title={t.title}
      aria-label={t.title}
    >
      <MessageSquareMoreIcon
        className='h-[1.2rem] w-[1.2rem]'
        aria-hidden='true'
      />
    </ExternalLink>
  );
}

export { MatrixButton };
