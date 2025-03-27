import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import { forwardRef, useContext } from 'react';

import { cx } from '@/lib/utils';

const InputOtp = forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cx(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cx('disabled:cursor-not-allowed', className)}
    {...props}
  />
));
InputOtp.displayName = 'InputOtp';

const InputOtpGroup = forwardRef<
  React.ComponentRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx('flex items-center', className)} {...props} />
));
InputOtpGroup.displayName = 'InputOtpGroup';

const InputOtpSlot = forwardRef<
  React.ComponentRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  if (!slot) {
    return null;
  }

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      ref={ref}
      className={cx(
        'relative flex h-10 w-10 items-center justify-center border-input border-y border-r text-base shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-1 ring-ring',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
        </div>
      )}
    </div>
  );
});
InputOtpSlot.displayName = 'InputOtpSlot';

const InputOtpSeparator = forwardRef<
  React.ComponentRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} aria-hidden='true' {...props}>
    <MinusIcon />
  </div>
));
InputOtpSeparator.displayName = 'InputOtpSeparator';

export { InputOtp, InputOtpGroup, InputOtpSlot, InputOtpSeparator };
