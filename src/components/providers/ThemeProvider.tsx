'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';

function NextThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export { NextThemeProvider as ThemeProvider };
