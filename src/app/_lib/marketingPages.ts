import { coreDescription } from "./seo";

export type MarketingPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  faq: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

const sharedRelated = [
  { label: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
  { label: "Online D&D Campaigns", href: "/online-dnd-campaigns" },
  { label: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
];

export const marketingPages: MarketingPage[] = [
  {
    slug: "what-is-malve-studios",
    path: "/what-is-malve-studios",
    title: "What Is Malve Studios?",
    description: "Learn how Malve Studios matches TTRPG players with vetted professional Game Masters nationwide online and for in-person sessions.",
    h1: "What Is Malve Studios?",
    intro: "Malve Studios is a tabletop roleplaying game matchmaking service that connects players with vetted professional Game Masters for online and in-person campaigns. We serve players nationwide online, support in-person games where our GM network is available, and offer destination sessions for private games and events.",
    sections: [
      { heading: "What Malve Studios Does", body: ["We help players find consistent tabletop roleplaying games without having to recruit a full table, vet a Game Master alone, or sort through mismatched schedules."] },
      { heading: "Who Malve Studios Is For", body: ["We built Malve Studios for adults, new players, returning players, private groups, and busy people who want a reliable Dungeons & Dragons or TTRPG campaign."] },
      { heading: "Where Malve Studios Operates", body: ["We serve online players nationwide, including players on both coasts, in the Midwest, and in the South. We support in-person games where our GM network is available and offer destination sessions for private games and events."] },
      { heading: "How Malve Studios Matches Players", body: ["We use player preferences such as schedule, experience level, tone, playstyle, campaign format, and campaign goals to help match people with the right table."] },
      { heading: "Why Vetted Game Masters Matter", body: ["A vetted professional Game Master can help set expectations, keep sessions organized, manage table tone, and create a more consistent campaign experience.", "At a Malve Studios table, comfort comes first. Once everyone feels respected and able to participate, our Game Masters focus on immersion, momentum, and fun for everyone at the table."] },
      { heading: "Online and In-Person Campaigns", body: ["We support online D&D campaigns, online tabletop RPG campaigns, private in-person campaigns, and destination sessions for private games and events. We are also always looking to hire DMs and GMs across the United States so we can keep expanding in-person availability over time."] },
      { heading: "How to Get Started", body: ["Start with the player intake form. We use your answers to understand what kind of table, Game Master, schedule, and campaign format may fit you."] },
    ],
    faq: [
      { question: "What is Malve Studios?", answer: "Malve Studios is a tabletop roleplaying game matchmaking service that connects players with vetted professional Game Masters for online and in-person campaigns." },
      { question: "Is Malve Studios a Dungeons & Dragons group?", answer: "We are not a single D&D group. We help match players and groups with professional Game Masters for Dungeons & Dragons and other tabletop roleplaying games." },
      { question: "Does Malve Studios run online campaigns?", answer: "Yes. We support online D&D campaigns and other online tabletop RPG campaigns." },
      { question: "Does Malve Studios offer in-person D&D?", answer: "Yes. We support in-person games where our GM network is available, offer destination sessions for private games and events, and are continuing to hire DMs and GMs across the United States." },
      { question: "Are Malve Studios Game Masters vetted?", answer: "Yes. We work with vetted Game Masters and use that vetting to help players find more reliable campaign experiences." },
      { question: "How do I join a campaign through Malve Studios?", answer: "Complete the player intake form so we can learn your schedule, experience level, playstyle, and campaign goals." },
    ],
    related: [
      { label: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
      { label: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
      { label: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
    ],
  },
  {
    slug: "ttrpg-player-matchmaking",
    path: "/ttrpg-player-matchmaking",
    title: "TTRPG Player Matchmaking | Malve Studios",
    description: "Find a consistent TTRPG group with Malve Studios player matchmaking by schedule, playstyle, tone, experience level, and campaign goals.",
    h1: "TTRPG Player Matchmaking",
    intro: `${coreDescription} TTRPG player matchmaking means helping players find a table that fits the way they actually want to play.`,
    sections: [
      { heading: "What TTRPG Matchmaking Means", body: ["Tabletop RPG matchmaking connects players with compatible groups and vetted professional Game Masters instead of leaving everyone to search alone."] },
      { heading: "Why Finding a Reliable Group Is Hard", body: ["Schedules change, playstyles differ, tone expectations vary, and many players do not want to recruit strangers or evaluate a Game Master without support."] },
      { heading: "How Malve Studios Matches Players", body: ["We consider schedule, experience level, tone, playstyle, campaign format, and campaign goals to help players find a consistent TTRPG group."] },
      { heading: "Who We Serve", body: ["We serve busy adults, new players, returning players, private groups, and anyone looking for D&D group matching with a vetted professional Game Master."] },
    ],
    faq: [
      { question: "What is TTRPG player matchmaking?", answer: "TTRPG player matchmaking connects tabletop roleplaying game players with compatible groups and Game Masters based on schedule, style, experience, and goals." },
      { question: "Can Malve Studios help me find a consistent TTRPG group?", answer: "Yes. We focus on helping players find more consistent online and in-person campaigns." },
      { question: "Does Malve Studios match D&D groups?", answer: "Yes. D&D group matching is one of the tabletop RPG matchmaking services we support." },
    ],
    related: [
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
      { label: "Professional Dungeon Master Cost", href: "/how-much-does-a-professional-dungeon-master-cost" },
    ],
  },
  {
    slug: "find-a-dnd-group-austin",
    path: "/find-a-dnd-group-austin",
    title: "Find a D&D Group in Austin | Malve Studios",
    description: "Malve Studios helps adults find vetted professional Game Masters and consistent online or in-person D&D groups in Austin.",
    h1: "Find a D&D Group in Austin",
    intro: "We help adults find vetted professional Game Masters and consistent D&D or TTRPG groups in Austin, with online and in-person campaign options.",
    sections: [
      { heading: "Austin D&D Group Matching", body: ["We support Austin players who want reliable D&D groups near them without having to manage every part of recruitment, scheduling, and Game Master vetting alone."] },
      { heading: "Online and In-Person Options", body: ["Austin players can look for online D&D campaigns, private in-person campaigns, long-term campaigns, and new-player-friendly tables."] },
      { heading: "Private and Long-Term Campaigns", body: ["We can help private groups and individual players look for a table format that fits their schedule, group size, tone, and campaign goals."] },
    ],
    faq: [
      { question: "How do I find a D&D group in Austin?", answer: "Complete the Malve Studios player intake form so we can learn your schedule, experience level, playstyle, and campaign preferences." },
      { question: "Does Malve Studios offer in-person D&D in Austin?", answer: "Yes. We support in-person options in Austin when the table, Game Master, and schedule fit." },
      { question: "Can new players join?", answer: "Yes. We support new-player-friendly D&D and TTRPG campaign matching." },
      { question: "How much do campaigns cost?", answer: "Costs depend on campaign format, group size, and service type. We list service pricing where available and can discuss specific campaign needs through intake." },
      { question: "Are the Game Masters vetted?", answer: "Yes. We work with vetted professional Game Masters." },
    ],
    related: [
      { label: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
      { label: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
    ],
  },
  {
    slug: "find-a-dnd-group-temple-tx",
    path: "/find-a-dnd-group-temple-tx",
    title: "Find a D&D Group in Temple, TX | Malve Studios",
    description: "Find online or in-person D&D and TTRPG groups in Temple, Bell County, and Central Texas with Malve Studios.",
    h1: "Find a D&D Group in Temple, TX",
    intro: "We help players in Temple, Bell County, and Central Texas find vetted professional Game Masters for reliable online and in-person campaigns.",
    sections: [
      { heading: "Temple and Bell County D&D Groups", body: ["We support adults in Temple, Bell County, and Central Texas who want a consistent tabletop roleplaying group that fits busy schedules."] },
      { heading: "Campaign Matching for Busy Adults", body: ["We look at schedule, experience level, format preferences, and campaign goals so players can spend less time searching and more time playing."] },
      { heading: "Online and In-Person Campaigns", body: ["Players can ask about online campaigns, local in-person options, private campaigns, and beginner-friendly campaign matching."] },
    ],
    faq: [
      { question: "How do I find a D&D group in Temple, TX?", answer: "Start with the Malve Studios player intake form so we can understand your schedule, experience, and campaign preferences." },
      { question: "Does Malve Studios serve Bell County?", answer: "Yes. We serve Temple, Bell County, Central Texas, online players, and destination sessions for private games and events." },
      { question: "Are campaigns online or in person?", answer: "We support both online and in-person campaign options depending on the table, Game Master, and schedule." },
      { question: "Can beginners join?", answer: "Yes. We support beginner-friendly D&D and TTRPG options." },
      { question: "How does Malve Studios match players?", answer: "We consider schedule, tone, playstyle, experience level, and campaign goals when helping match players with tables." },
    ],
    related: [
      { label: "Online D&D Campaigns", href: "/online-dnd-campaigns" },
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
    ],
  },
  {
    slug: "professional-dungeon-master-austin",
    path: "/professional-dungeon-master-austin",
    title: "Professional Dungeon Master Austin | Malve Studios",
    description: "Hire a vetted professional Dungeon Master in Austin for private, online, in-person, and paid D&D campaign formats.",
    h1: "Professional Dungeon Master in Austin",
    intro: `${coreDescription} We help Austin players and private groups connect with vetted Dungeon Masters for paid D&D campaign formats.`,
    sections: [
      { heading: "What a Professional Dungeon Master Does", body: ["A professional Dungeon Master prepares and runs the campaign, guides the table, supports players, handles pacing, and helps create a reliable Dungeons & Dragons experience."] },
      { heading: "Why Hire a Dungeon Master", body: ["A paid D&D campaign can make sense for private groups, busy adults, new players, special events, or anyone who wants a prepared and consistent table."] },
      { heading: "How Malve Studios Vets Game Masters", body: ["We work with vetted Game Masters and use player preferences to help match tables with the right professional GM for the campaign."] },
      { heading: "Campaign Formats", body: ["We support private in-person campaigns in Austin, online campaign options, long-term campaigns, new-player-friendly formats, and destination sessions for private games and events."] },
    ],
    faq: [
      { question: "Can I hire a Dungeon Master in Austin through Malve Studios?", answer: "Yes. We help Austin players and groups connect with vetted professional Dungeon Masters." },
      { question: "Does Malve Studios offer paid D&D campaigns?", answer: "Yes. We offer paid campaign formats and can help players understand available options." },
      { question: "Are online campaigns available?", answer: "Yes. We support online D&D campaigns as well as in-person formats." },
    ],
    related: [
      { label: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "Professional Dungeon Master Cost", href: "/how-much-does-a-professional-dungeon-master-cost" },
    ],
  },
  {
    slug: "professional-game-master-services",
    path: "/professional-game-master-services",
    title: "Professional Game Master Services | Malve Studios",
    description: "Explore Malve Studios professional Game Master services for online, in-person, private, and long-term tabletop RPG campaigns.",
    h1: "Professional Game Master Services",
    intro: coreDescription,
    sections: [
      { heading: "Vetted Professional Game Masters", body: ["We help players find professional Game Masters who fit the campaign's schedule, tone, experience level, and playstyle.", "A Malve Studios Game Master prioritizes player comfort first, then builds the kind of immersive, exciting table experience where everyone gets to have fun."] },
      { heading: "Service Formats", body: ["Campaign options can include online sessions, in-person sessions, private tabletop RPG campaigns, long-term campaigns, and new-player-friendly tables."] },
      { heading: "Who Uses These Services", body: ["Professional GM services can work well for busy adults, private friend groups, new players, and players who want a more consistent campaign experience."] },
    ],
    faq: [
      { question: "What are professional Game Master services?", answer: "They are paid tabletop RPG services where a vetted Game Master prepares and runs sessions for a group." },
      { question: "Does Malve Studios support Dungeons & Dragons?", answer: "Yes. We support Dungeons & Dragons and other tabletop roleplaying games." },
      { question: "Can Malve Studios help private groups?", answer: "Yes. We can help private groups look for a Game Master and campaign format that fits." },
    ],
    related: sharedRelated,
  },
  {
    slug: "online-dnd-campaigns",
    path: "/online-dnd-campaigns",
    title: "Online D&D Campaigns | Malve Studios",
    description: "Join online D&D campaigns with vetted professional Game Masters matched by schedule, experience, tone, and playstyle.",
    h1: "Online D&D Campaigns",
    intro: `${coreDescription} Online campaigns help players find a reliable table without needing everyone to live in the same city.`,
    sections: [
      { heading: "Why Play D&D Online", body: ["Online D&D campaigns can make scheduling easier, widen the pool of possible players, and support consistent play for busy adults."] },
      { heading: "How Malve Studios Helps", body: ["We match players with vetted professional Game Masters based on schedule, experience level, tone, playstyle, and campaign goals."] },
      { heading: "Online Table Options", body: ["Online tabletop campaigns can support long-term campaigns, drop-in play, new-player-friendly games, and private groups."] },
    ],
    faq: [
      { question: "Does Malve Studios run online D&D campaigns?", answer: "Yes. We support online D&D and online tabletop RPG campaigns." },
      { question: "Can online campaigns work for beginners?", answer: "Yes. We support new-player-friendly online campaign matching." },
      { question: "Do I need to live in Austin or Temple?", answer: "No. We serve online players nationwide, including players on both coasts, in the Midwest, and in the South." },
    ],
    related: [
      { label: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
    ],
  },
  {
    slug: "in-person-dnd-campaigns",
    path: "/in-person-dnd-campaigns",
    title: "In-Person D&D Campaigns | Malve Studios",
    description: "Find in-person D&D campaigns, private tabletop RPG sessions, and destination games with vetted professional Game Masters.",
    h1: "In-Person D&D Campaigns",
    intro: `${coreDescription} In-person campaigns are for players and private groups who want the feel of a shared table.`,
    sections: [
      { heading: "In-Person Campaign Matching", body: ["We help match local players and private groups with vetted professional Game Masters for tabletop RPG sessions."] },
      { heading: "Nationwide Online Play and Destination Sessions", body: ["We serve online players nationwide and support in-person games where our GM network is available. We are always looking to hire DMs and GMs across the United States, with the long-term goal of having at least one professional DM in every state. If you want in-person games, we can start looking for the right Game Master in your area."] },
      { heading: "Private Group Options", body: ["In-person D&D campaigns can work for private groups, long-term campaigns, new-player-friendly sessions, and custom campaign formats."] },
    ],
    faq: [
      { question: "Does Malve Studios offer in-person D&D campaigns?", answer: "Yes. We support in-person campaign options when a group, Game Master, location, and schedule fit." },
      { question: "Where are in-person campaigns available?", answer: "We support in-person games where our GM network is available and can start looking for the right Game Master in your area. We also offer destination sessions for private games and events." },
      { question: "Can private groups use Malve Studios?", answer: "Yes. Private groups can use Malve Studios to look for a vetted professional Game Master." },
    ],
    related: [
      { label: "Online D&D Campaigns", href: "/online-dnd-campaigns" },
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
    ],
  },
  {
    slug: "how-malve-vets-game-masters",
    path: "/how-malve-vets-game-masters",
    title: "How Malve Studios Vets Game Masters",
    description: "Learn why vetted professional Game Masters matter and how we use fit, reliability, and player experience in matching.",
    h1: "How Malve Studios Vets Game Masters",
    intro: `${coreDescription} Vetting matters because the Game Master shapes the safety, rhythm, preparation, and consistency of the table.`,
    sections: [
      { heading: "Why Vetted Game Masters Matter", body: ["A vetted Game Master helps set expectations, communicate clearly, prepare sessions, and support a table experience that fits the players.", "Comfort at the table is the first priority. Once players feel welcome, respected, and able to participate, immersion and fun for everyone become the next priority."] },
      { heading: "What We Look For", body: ["We consider reliability, table communication, player experience, campaign tone, and whether a GM is a strong fit for the kind of game players want.", "We look for DMs and GMs who can make a game feel alive without losing sight of the people around the table."] },
      { heading: "Matching Beyond Availability", body: ["Availability matters, but we also consider playstyle, experience level, tone, campaign goals, and online or in-person format preferences."] },
    ],
    faq: [
      { question: "Are Malve Studios Game Masters vetted?", answer: "Yes. We work with vetted Game Masters for online and in-person campaign matching." },
      { question: "Why does GM vetting matter?", answer: "GM vetting helps players find a more reliable, prepared, and compatible tabletop roleplaying experience. We prioritize comfort first, then immersion and fun for everyone at the table." },
      { question: "Does vetting guarantee a perfect fit?", answer: "No. We use vetting and player preferences to improve fit, but no campaign match should be treated as a guarantee." },
    ],
    related: [
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
      { label: "Professional Dungeon Master Cost", href: "/how-much-does-a-professional-dungeon-master-cost" },
    ],
  },
  {
    slug: "how-much-does-a-professional-dungeon-master-cost",
    path: "/how-much-does-a-professional-dungeon-master-cost",
    title: "Professional Dungeon Master Cost | Malve Studios",
    description: "Learn what affects professional Dungeon Master cost, including campaign format, group size, session length, and online or in-person play.",
    h1: "How Much Does a Professional Dungeon Master Cost?",
    intro: `${coreDescription} Professional Dungeon Master cost depends on the campaign format, group size, session length, preparation needs, and whether play is online or in person.`,
    sections: [
      { heading: "What Affects Cost", body: ["Pricing can vary based on session length, number of players, online or in-person format, private group needs, and the amount of preparation a campaign requires."] },
      { heading: "Online Versus In-Person", body: ["Online campaigns may have different costs than in-person sessions because travel, physical materials, venue needs, and logistics can change the format."] },
      { heading: "How to Get a Clear Estimate", body: ["The best next step is to complete the player intake form so we can understand your group size, schedule, campaign goals, and preferred format."] },
    ],
    faq: [
      { question: "How much does a professional Dungeon Master cost?", answer: "Cost depends on the campaign format, session length, group size, and whether the campaign is online or in person." },
      { question: "Does Malve Studios list service prices?", answer: "We list pricing where available and can discuss specific needs after reviewing player or group intake information." },
      { question: "Are paid D&D campaigns only for experienced players?", answer: "No. Paid campaigns can work for new players, returning players, private groups, and experienced tables." },
    ],
    related: [
      { label: "Professional Game Master Services", href: "/professional-game-master-services" },
      { label: "Online D&D Campaigns", href: "/online-dnd-campaigns" },
      { label: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
    ],
  },
];

export const marketingPageMap = new Map(marketingPages.map((page) => [page.slug, page]));
