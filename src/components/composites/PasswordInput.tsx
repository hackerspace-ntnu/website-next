'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cx } from '@/lib/utils';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input, type InputProps } from '@/components/ui/Input';

const PasswordInput = ({
  ref,
  className,
  ...props
}: InputProps & {
  ref: React.RefObject<HTMLInputElement>;
}) => {
  const t = useTranslations('ui');
  const [showPassword, setShowPassword] = useState(false);
  const disabled =
    props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cx('pr-10', className)}
        ref={ref}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
        aria-label={showPassword ? t('showPassword') : t('hidePassword')}
      >
        {showPassword && !disabled ? (
          <EyeIcon className='h-4 w-4' aria-hidden='true' />
        ) : (
          <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
        )}
      </Button>
    </div>
  );
};
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
