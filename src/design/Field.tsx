import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { cx } from '@/lib/utils';

import { Button } from '@/components/ui/Button';

interface FieldProps {
  className?: string;
  title?: string;
  required?: boolean;
  type?: string;
  value?: string;
  formatter?: (value: string) => string;
  defaultFormat?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  _icon?: React.ComponentType<{ className: string }>;
  readOnly?: boolean;
  placeholder?: string;
  step?: number;
  buttons?: {
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  }[];
  disabled?: boolean;
  error?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({
  className,
  title,
  required,
  type,
  value,
  formatter,
  defaultFormat,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  onEnter,
  _icon,
  readOnly,
  placeholder,
  step,
  buttons,
  disabled,
  error,
  id,
  onClick,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  const _onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    if (type !== 'select') {
      event.target.select();
    }
  };

  const _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
    }
    if (formatter !== undefined && defaultFormat !== undefined) {
      if (!event.target.value || event.target.value === '') {
        event.target.value = formatter(defaultFormat).toString();
      } else {
        event.target.value = formatter(event.target.value).toString();
      }
      if (onChange) {
        onChange(event);
      }
    }
  };

  const _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.key === 'Enter' && onEnter) {
      onEnter(event);
    }
  };

  const _onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className={`w-full text-sm font-bold`}>
      {title ? (
        <span className='text-text-50 select-none'>
          {title}
          {required ? <span className='ml-1 text-red-500'>*</span> : null}
        </span>
      ) : null}
      <div className='flex'>
        <div
          className={cx([
            className,
            'flex w-full rounded-md shadow-md outline-none transition-all duration-200',
            readOnly ?? disabled ? 'bg-accent-500' : 'bg-accent-800',
            disabled ? 'text-text-50 cursor-not-allowed' : 'cursor-auto',
          ])}
        >
          <div className='relative h-full w-full'>
            <input
              id={id}
              type={type === 'password' && showPassword ? 'text' : type}
              value={value}
              placeholder={placeholder}
              step={step}
              readOnly={readOnly ?? onClick !== undefined}
              disabled={disabled}
              onChange={_onChange}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onClick={_onClick}
              onKeyDown={_onKeyDown}
              className={cx([
                'h-10 w-full select-all border-2 bg-transparent p-2 font-semibold leading-6 outline-none',
                buttons ?? type === 'password' ? 'rounded-l-md' : 'rounded-md',
                error
                  ? 'border-red-500'
                  : 'border-accent-700 hover:border-accent-600',
                disabled ? 'cursor-not-allowed' : '',
                onClick ? 'cursor-pointer' : '',
                _icon ? 'pr-[1.75rem]' : '',
              ])}
            />
            {_icon ? (
              <span className='absolute right-2 top-3'>
                <_icon className='text-accent-50 h-4 w-4' />
              </span>
            ) : null}
          </div>
          {buttons ?? type === 'password' ? (
            <div className='relative flex items-center'>
              {buttons !== undefined
                ? buttons.map((value, index) => {
                    return (
                      <Button
                        className={cx([
                          'h-full',
                          buttons.length === 1
                            ? 'bg-green-500 px-2'
                            : 'bg-accent-500 w-10',
                          index === buttons.length - 1
                            ? ' rounded-l-none rounded-r-md'
                            : 'rounded-none',
                          'disabled:bg-accent-500',
                          value.className,
                        ])}
                        key={index}
                        onClick={value.onClick}
                        disabled={value.disabled ?? disabled}
                      >
                        {value.label}
                      </Button>
                    );
                  })
                : null}
              {type === 'password' ? (
                <Button
                  className={cx([
                    'h-full',
                    'rounded-l-none rounded-r-md',
                    'disabled:bg-accent-500',
                    buttons !== undefined
                      ? 'bg-green-500 px-2'
                      : 'bg-accent-500 w-10',
                  ])}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className='w-full' />
                  ) : (
                    <Eye className='w-full' />
                  )}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {error ? (
        <span className='text-xs font-light text-red-500'>{error}</span>
      ) : null}
    </div>
  );
};

export default Field;
