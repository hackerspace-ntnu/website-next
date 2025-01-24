import { MatrixLogo } from '@/components/assets/logos';
import { ExternalLink } from '@/components/ui/Link';

type MatrixLinkProps = {
  className?: string;
  t: {
    title: string;
  };
};

function MatrixLink({ className, t }: MatrixLinkProps) {
  return (
    <ExternalLink
      className={className}
      variant='ghost'
      size='icon'
      href='https://element.hackerspace-ntnu.no/#/login'
      title={t.title}
      aria-label={t.title}
    >
      <MatrixLogo className='h-[1.2rem] w-[1.2rem]' />
    </ExternalLink>
  );
}

export { MatrixLink };
