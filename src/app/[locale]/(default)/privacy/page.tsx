import { Indent } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  return (
    <div className="max-w-prose">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("privacy")}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t("atHackerspace")}
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("dataResponsability")}
      </h2>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{t("dataResponsabilityListItemOne")}</li>
        <li>{t("dataResponsabilityListItemTwo")}</li>
        <li>{t("dataResponsabilityListItemThree")}</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t("yourData")}</p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("collect")}
      </h3>
      <p>{t("weCollect")}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{t("weCollectListItemOne")}</li>
        <li>{t("weCollectListItemTwo")}</li>
        <li>{t("weCollectListItemThree")}</li>
        <li>{t("weCollectListItemFour")}</li>
      </ul>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("howWeUseData")}
      </h3>
      <p>{t("forTheFollowing")}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <span className="font-semibold">
            {t("forTheFollowingListItemOneSpan")}
          </span>{" "}
          {t("forTheFollowingListItemOne")}
        </li>
        <li>
          <span className="font-semibold">
            {t("forTheFollowingListItemTwoSpan")}
          </span>{" "}
          {t("forTheFollowingListItemTwo")}
        </li>
        <li>
          <span className="font-semibold">
            {t("forTheFollowingListItemThreeSpan")}
          </span>{" "}
          Med ditt
          {t("forTheFollowingListItemThree")}
        </li>
        <li>
          <span className="font-semibold">
            {t("forTheFollowingListItemFourSpan")}
          </span>{" "}
          {t("forTheFollowingListItemFour")}
        </li>
      </ul>
      <h3>{t("protect")}</h3>
      <p>{t("weProtect")}</p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("rights")}
      </h3>
      <p>{t("gdpr")}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <span className="font-semibold">{t("gdprListItemOneSpan")}</span>{" "}
          {t("gdprListItemOne")}
        </li>
        <li>
          <span className="font-semibold">{t("gdprListItemTwoSpan")}</span>{" "}
          {t("gdprListItemTwo")}
        </li>
        <li>
          <span className="font-semibold">{t("gdprListItemThreeSpan")}</span>{" "}
          {t("gdprListItemThree")}
        </li>
        <li>
          <span className="font-semibold">{t("gdprListItemFourSpan")}</span>{" "}
          {t("gdprListItemFour")}
        </li>
        <li>
          <span className="font-semibold">{t("gdprListItemFiveSpan")}</span>{" "}
          {t("gdprListItemFive")}
        </li>
      </ul>
      {t("exercise")}
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("cookies")}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t("weUseCookies")}
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("thirdPartySharing")}
      </h3>
      {t("thirdPartySharingPurposes")}
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <span className="font-semibold">
            {" "}
            {t("thirdPartyListItemOneSpan")}
          </span>{" "}
          {t("thirdPartyListItemOne")}
        </li>
        <li>
          <span className="font-semibold">
            {t("thirdPartyListItemTwoSpan")}
          </span>{" "}
          {t("thirdPartyListItemTwo")}
        </li>
      </ul>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("privacyChange")}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t("privacyChangeClause")}
      </p>
    </div>
  );
}
