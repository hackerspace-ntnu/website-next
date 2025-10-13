import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import { useContext } from 'react';

import { cx } from '@/lib/utils';

function InputOtp({
  className,
  containerClassName,
  ...props
}: React.ComponentPropsWithRef<typeof OTPInput>) {
  return (
    <OTPInput
      containerClassName={cx(
        'flex items-center gap-2 has-[:disabled]:opacity-50',
        containerClassName,
      )}
      className={cx('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOtpGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return <div className={cx('flex items-center', className)} {...props} />;
}

function InputOtpSlot({
  index,
  className,
  ...props
}: React.ComponentPropsWithRef<'div'> & {
  index: number;
}) {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  if (!slot) {
    return null;
  }

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      className={cx(
        'relative flex h-8 w-8 items-center justify-center border-input border-y border-r text-base shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md sm:h-10 sm:w-10',
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
}

function InputOtpSeparator(props: React.ComponentPropsWithRef<'div'>) {
  return (
    <div aria-hidden='true' {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOtp, InputOtpGroup, InputOtpSlot, InputOtpSeparator };
