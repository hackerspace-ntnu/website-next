import { cx } from '@/lib/utils';

function AnimatedGradientText({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'animate-text-gradient bg-[length:200%_auto] bg-gradient-to-r bg-size from-30% from-primary via-50% via-sky-500 to-80% to-emerald-400 bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}

export { AnimatedGradientText };
