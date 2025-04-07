'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

type CountdownButtonProps = {
  initialCountdown: number;
  onClick: () => void;
  label: (seconds: number) => string;
};

function CountdownButton({
  initialCountdown,
  onClick,
  label,
}: CountdownButtonProps) {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleClick = () => {
    onClick();
    setCountdown(initialCountdown);
  };

  return (
    <Button
      className='text-primary hover:text-primary'
      variant='ghost'
      type='button'
      onClick={handleClick}
      disabled={countdown > 0}
    >
      {label(countdown)}
    </Button>
  );
}

export { CountdownButton };
