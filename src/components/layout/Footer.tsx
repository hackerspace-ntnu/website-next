import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("layout");
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary-50 dark:bg-secondary-900 z-10 flex w-full justify-center px-11 py-10 md:px-16 lg:px-24">
      <div className="text-foreground w-full max-w-screen-2xl text-base"></div>
    </footer>
  );
}

export { Footer };
