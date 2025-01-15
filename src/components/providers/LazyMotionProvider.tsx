import { LazyMotion, domAnimation } from 'motion/react';

function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export { LazyMotionProvider };
