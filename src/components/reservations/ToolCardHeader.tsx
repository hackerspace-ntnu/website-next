'use client';
import { Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useId, useState } from 'react';

type ToolCardHeaderProps = {
  onClick: () => void;
  photoUrl: string;
  photoTitle: string;
};

export function ToolCardHeader({
  onClick,
  photoUrl,
  photoTitle,
}: ToolCardHeaderProps) {
  const [hovered, setHovered] = useState(false);
  const t = useTranslations();
  const id = useId();

  return (
    <div
      className='flex max-h-56 items-center justify-center'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        width={185}
        height={185}
        src={photoUrl}
        alt={photoTitle}
        className='size-full h-48 rounded-t-g object-fill'
      />

      <AnimatePresence>
        <div className='z-0'>
          <motion.button
            className='absolute top-2 right-2 z-10 inline-flex size-11 transform cursor-pointer items-center justify-center rounded-full bg-stone-500 bg-opacity-50 backdrop-blur-sm transition delay-120 duration-300 ease-in-out hover:scale-105 hover:bg-primary'
            key={`cardHeaderButton-${photoTitle}-${id}`}
            onClick={onClick}
            animate={{ scale: hovered ? 1.1 : 1 }}
          >
            <Maximize2 className='size-6 transform stroke-stone-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:stroke-stone-200' />
          </motion.button>
          {hovered && (
            <motion.div
              key={`cardHeaderToolTip-${photoTitle}-${id}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              className='absolute top-3 right-11 z-0 whitespace-nowrap rounded-xl rounded-r-none bg-black bg-opacity-40 px-3 py-2 text-sm text-white shadow-lg'
            >
              Read more about this tool
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
