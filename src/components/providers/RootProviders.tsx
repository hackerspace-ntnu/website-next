import { type ReactNode } from "react";

import { IntlErrorProvider } from "@/components/providers/IntlErrorProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

function RootProviders({ children, params: { locale } }: Props) {
  return (
    <ThemeProvider>
      <IntlErrorProvider params={{ locale: locale }}>
        {children}
      </IntlErrorProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
