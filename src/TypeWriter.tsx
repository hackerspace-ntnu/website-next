import { useState, useEffect } from 'react'

// Component Interface
interface TypeWriterProps {
  className?: string,
  text: string
  delay: number
}

// Component Function
const TypeWriter: React.FC<TypeWriterProps> = ({ className, text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <pre className={className}>{`${currentText}`}</pre>
  )
}

export default TypeWriter