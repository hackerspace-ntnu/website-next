import { LazyMotion, domAnimation } from 'framer-motion';

function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export { LazyMotionProvider };
