import type { Metadata } from "next";

export const siteUrl = "https://www.malvestudios.com";
export const siteName = "Malve Studios";
export const intakeUrl = "https://malvestudios.notion.site/12d1b67a744e8028ab50fd2725091aff";
export const intakePath = intakeUrl;
export const defaultOgImage = "/pro_dm_Reliable_GMs.png";

export const coreDescription =
  "Malve Studios matches tabletop roleplaying game players nationwide with vetted professional Game Masters for online, in-person, private, event, and destination campaigns.";

export const publicMarketingPaths = [
  "/",
  "/services",
  "/contact-us",
  "/blog",
  "/what-is-malve-studios",
  "/ttrpg-player-matchmaking",
  "/professional-dungeon-master-austin",
  "/find-a-dnd-group-austin",
  "/find-a-dnd-group-temple-tx",
  "/professional-game-master-services",
  "/online-dnd-campaigns",
  "/in-person-dnd-campaigns",
  "/how-malve-vets-game-masters",
  "/how-much-does-a-professional-dungeon-master-cost",
];

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: absoluteUrl(defaultOgImage),
          width: 1200,
          height: 630,
          alt: "Malve Studios tabletop roleplaying game table",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(defaultOgImage)],
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
