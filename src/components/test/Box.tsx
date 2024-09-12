'use client';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

function Box({ ...props }) {
  const [numberOfClicks, setNumberOfClicks] = useState(0);

  function handleClick() {
    setNumberOfClicks(numberOfClicks + 1);
    console.log('button clicked', numberOfClicks);
  }
  return (
    <Button variant='outline' onClick={handleClick}>
      {' '}
      I have been clicked: {numberOfClicks}
    </Button>
  );
}

export { Box };
