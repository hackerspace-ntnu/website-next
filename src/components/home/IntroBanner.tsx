import Image from 'next/image';
import { HackerspaceLogo } from '../assets/logos';

function IntroBanner() {
  return (
    <div className='h-screen'>
      <Image
        className='object-cover'
        src='/bg.jpg'
        alt='...'
        fill
        loading='eager'
      />
      <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 transform'>
        <h1 className='~md:2xl:~text-5xl/7xl'>Homepage</h1>
      </div>
    </div>
  );
}

export { IntroBanner };
