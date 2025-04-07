import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function BreadBoardComputerPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("about.breadboard-computer-group");

  return <div></div>;
}
