import { cx } from '@/lib/utils';

function AnimatedGradientText({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        // biome-ignore lint/nursery/useSortedClasses: Biome breaks the effect
        'animate-text-gradient bg-size bg-[length:200%_auto] bg-gradient-to-r from-30% from-primary via-50% via-sky-500 to-80% to-emerald-400 bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}

export { AnimatedGradientText };
