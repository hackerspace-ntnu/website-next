import Image from 'next/image';

function IntroBanner() {
  return (
    <div className='h-[calc(100vh-5rem)]'>
      <Image
        className='mx-auto object-cover'
        src='/bg.jpg'
        alt='...'
        fill
        loading='eager'
      />
      <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-full transform flex-col gap-5 text-center text-background shadow-foreground dark:text-foreground dark:shadow-background'>
        <h1 className='~sm/2xl:~text-4xl/7xl [text-shadow:_6px_3px_4px_var(--tw-shadow-color)]'>
          Hackerspace NTNU
        </h1>
        <span className='~sm/2xl:~text-lg/2xl [text-shadow:_4px_2px_2.67px_var(--tw-shadow-color)]'>
          noe spennende tekst her nede
        </span>
      </div>
    </div>
  );
}

export { IntroBanner };
