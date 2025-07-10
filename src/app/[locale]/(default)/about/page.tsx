import { FAQAccordion } from "@/components/about/FAQAccordion";
import { GroupCardGrid } from "@/components/about/GroupCardGrid";
import { Meteors } from "@/components/fancy/Meteors";
import { Gamepad2, Printer, SquareUserRound } from "lucide-react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import pizzaWolfs from "public/about/pizzaWolfs-min.png";
import React from "react";
import { Card, CardContent, CardHeader } from "src/components/ui/Card";

export async function generateMetadata() {
	const t = await getTranslations("layout");

	return {
		title: t("about"),
	};
}

export default async function AboutPage({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;
	const t = await getTranslations("about");
	const tFAQ = await getTranslations("about.FAQ");

	const cardData = [
		{
			id: 1,
			title: t("leaderboard.title"),
			content: t("leaderboard.about"),
			link: `/${locale}/about/leaderboard`,
		},
		{
			id: 2,
			title: t("memberRepresentative.title"),
			content: t.rich("memberRepresentative.about", {
				p1: (chunks) => <p className="p1"> {chunks}</p>,
				p2: (chunks) => <p className="p2"> {chunks}</p>,
			}),
			link: `/${locale}/about/leaderboard`,
		},
		{
			id: 3,
			title: t("devops.title"),
			content: t("devops.about"),
			link: `/${locale}/about/leaderboard`,
		},
		{
			id: 4,
			title: t("labops.title"),
			content: t("labops.about"),
			link: `/${locale}/about/leaderboard`,
		},
		{
			id: 5,
			title: t("breadboard-computer-group.title"),
			content: t("breadboard-computer-group.about"),
			link: `/${locale}/about/labops`,
		},
		{
			id: 6,
			title: t("ttrpg-group.title"),
			content: t("ttrpg-group.about"),
			link: "",
		},
	];

	/* const faqs: FAQ[] = [
  {
    id: 'item-1',
    icon: <Printer />,
    question: tFAQ('canIUseThe3dPrinter'),
    answer: tFAQ.rich('answerCanIUseThe3dPrinter', {
      p1: (chunks) => <p className="p1">{chunks}</p>,
      p2: (chunks) => <p className="p2">{chunks}</p>
    })
  },
  {
    id: 'item-2',
    icon: <Gamepad2/>,
    question: tFAQ('canITryVRGames-Equipment'),
    answer: tFAQ('answerCanITryVRGames-Equipment')
  },
  {
    id: 'item-3',
    icon: <SquareUserRound/>,
    question: tFAQ('howDoIBecomeAMember'),
    answer: tFAQ.rich('answerHowDoIBecomeAMember', {
      p1: (chunks) => <p className="p1">{chunks}</p>,
      p2: (chunks) => <p className="p2">{chunks}</p>
    })
  }
]; */

	return (
		<div>
			<div className="mt-7 mb-5 flex flex-col items-center justify-center">
				<Image
					className="pizzaWolfs"
					src={pizzaWolfs}
					alt="pizza wolfs"
					height={400}
					width={400}
					priority
				/>
			</div>
			<div>
				<h1 className="mt-8 mb-4"> {t("whatIsHackerspace")} </h1>
				<div className="mb-6 text-base">
					{t.rich("aboutDescription", {
						p1: (chunks) => <p className="p1"> {chunks} </p>,
						p2: (chunks) => <p className="p2"> {chunks} </p>,
						p3: (chunks) => <p className="p3"> {chunks} </p>,
					})}
				</div>
			</div>
			{/* SKAL LEGGES I BUNNEN AV LANDINGPAGE? <FAQAccordion faqs={(faqs)}/> */}

			<h2 className="m-5 content-center items-center text-center">
				{" "}
				{t("activeGroup")}{" "}
			</h2>
			<GroupCardGrid />

			<div className="grid gap-4 lg:grid-cols-1">
				{cardData.map((card) => (
					<div key={card.id} className="group relative p-4">
						<Card className="relative overflow-hidden">
							<CardHeader className="font-semibold text-xl group-hover:underline">
								{card.title}
							</CardHeader>
							<CardContent className="max-h-30 overflow-hidden text-ellipsis whitespace-normal">
								{card.content}
							</CardContent>
							<div className="absolute inset-0 z-10 animate-meteors opacity-0 transition-opacity duration-500 group-hover:opacity-100">
								<Meteors number={15} className={"absolute inset-0 z-10"} />
							</div>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}
