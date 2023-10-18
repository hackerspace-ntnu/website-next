import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  _icon?: React.ComponentType<{className: string}>;
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
  onClick

}) => {
  const [showPassword, setShowPassword] = useState(false);

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
  }

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className={`text-sm font-bold w-full`}>
      {
        title ? 
        <span className='text-text-50 select-none'>
          {title}
          {
            required ? 
            <span className='text-red-500 ml-1'>*</span> 
            : null
          }
        </span>
        : null
      }
      <div className='flex'>
        <div 
          className={classNames([
            className,
            "flex transition-all duration-200 rounded-md outline-none w-full shadow-md",
            readOnly || disabled ? 'bg-accent-500' : 'bg-accent-800',
            disabled ? 'cursor-not-allowed text-text-50' : 'cursor-auto'
          ])}
        >
          <div className='w-full h-full relative'>
            <input
              id={id}
              type={(type === 'password' && showPassword) ? 'text' : type}
              value={value}
              placeholder={placeholder}
              step={step}
              readOnly={readOnly || onClick !== undefined}
              disabled={disabled}
              onChange={_onChange}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onClick={_onClick}
              onKeyDown={_onKeyDown}
              className={classNames([
                "w-full h-10 bg-transparent border-2 outline-none leading-6 p-2 select-all font-semibold",
                buttons || (type === 'password') ? 'rounded-l-md' : 'rounded-md',
                error ? 'border-red-500' : 'border-accent-700 hover:border-accent-600',
                disabled ? 'cursor-not-allowed' : '',
                onClick ? 'cursor-pointer' : '',
                _icon ? 'pr-[1.75rem]' : '',
              ])}
            />
            {
              _icon
              ?
              <span className='absolute right-2 top-3'>
                <_icon className='h-4 w-4 text-accent-50'/>
              </span>
              : null
            }
          </div>
          {
            buttons || (type === 'password')
            ?
            <div className='flex items-center relative'>
              {
                buttons !== undefined ?
                buttons.map((value, index) => {
                  return (
                    <Button 
                      className={classNames([
                        'h-full',
                        buttons.length === 1 ? 'bg-green-500 px-2' : 'bg-accent-500 w-10',
                        index === buttons.length - 1 ? ' rounded-l-none rounded-r-md' : 'rounded-none',
                        'disabled:bg-accent-500',
                        value.className
                      ])} 
                      key={index}
                      onClick={value.onClick}
                      disabled={value.disabled || disabled}
                    >
                      {value.label}
                    </Button>
                  )
                })

                : null
              }
              {
                type === 'password' ?
                  <Button 
                    className={classNames([
                      'h-full',
                      'rounded-l-none rounded-r-md',
                      'disabled:bg-accent-500',
                      buttons !== undefined ? 'bg-green-500 px-2' : 'bg-accent-500 w-10'
                    ])} 
                    onClick={toggleShowPassword}
                  >
                    {
                      showPassword ?
                      <FaEyeSlash className='w-full'/>
                      : <FaEye className='w-full'/>
                    }
                  </Button>
                : null
              }
            </div>
            : null
          }
        </div>
        
      </div>
      {
        error
        ? <span className='text-xs font-light text-red-500'>{error}</span> 
        : null
      }
    </div>
  )
}

export default Field
