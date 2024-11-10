import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';



export default function BreadBoardComputerPage({
    params: { locale },
  }: {
    params: { locale: string };
  }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('about.breadboard-computer-group')

    return  (
      <div> 
      </div>
    );
}