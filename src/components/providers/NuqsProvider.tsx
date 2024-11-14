import { NuqsAdapter } from 'nuqs/adapters/next/app';

function NuqsProvider({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

export { NuqsProvider };
