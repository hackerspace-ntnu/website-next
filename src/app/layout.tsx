// app/layout.tsx

import '../lib/styles/globals.css';
import { PostHogProvider } from '@/components/providers/PostHogProvider';

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
