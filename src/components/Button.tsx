import React from 'react';
import classNames from 'classnames';

// Button Props
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  big?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Button Component: This will serve as a generic button.
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  big = false,
  disabled = false,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
    }
  };

  const buttonClasses = {
    'transition-all duration-75 relative top-0 font-black': true,
    'flex justify-center items-center rounded-md select-none': true,
    'disabled:btn-gray disabled:cursor-not-allowed': true,
    'p-4 text-xl': big,
    'p-2': !big,
    'btn': true
  };

  return (
    <button
      className={classNames(className, buttonClasses)}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;