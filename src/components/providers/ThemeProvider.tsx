'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      themeColor={{
        light: 'hsl(0 0% 100%)',
        dark: 'hsl(20 14.3% 4.1%)',
      }}
    >
      {children}
    </NextThemeProvider>
  );
}

export { ThemeProvider };
