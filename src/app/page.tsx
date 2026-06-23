import styles from "./page.module.css"
import Link from "next/link";
import JsonLd from "./_components/JsonLd";
import { absoluteUrl, coreDescription, intakePath, pageMetadata, siteUrl } from "./_lib/seo";

export const metadata = pageMetadata({
  title: "Malve Studios | Vetted TTRPG Game Master Matching",
  description: "Malve Studios matches tabletop RPG players nationwide with vetted professional Game Masters for online, in-person, private, and event campaigns.",
  path: "/",
});

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Malve Studios",
    url: siteUrl,
    logo: absoluteUrl("/pro_dm_MS_Logo_White.svg"),
    description: coreDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Malve Studios",
    url: siteUrl,
    image: absoluteUrl("/pro_dm_Reliable_GMs.png"),
    description: coreDescription,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Online" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Malve Studios",
    url: siteUrl,
    description: coreDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TTRPG matchmaking and professional Game Master services",
    provider: {
      "@type": "Organization",
      name: "Malve Studios",
      url: siteUrl,
    },
    serviceType: [
      "TTRPG matchmaking",
      "Professional Game Master services",
      "Dungeons & Dragons campaign matching",
      "Online D&D campaigns",
      "In-person D&D campaigns",
      "Private tabletop RPG campaigns",
    ],
    areaServed: ["United States", "Online"],
    description: coreDescription,
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={homepageSchema} />
      <div className={`${styles.masthead} ${styles.video_background}`}>
        <video className={styles.background_video} muted loop playsInline autoPlay id="background_video">
          <source src="/pro_dm_MS_Masthead_Video_Loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.video_text}>
          <h1 className={styles.masthead_text}>Stop Rolling Dice To Find Your Next Campaign</h1>
          <Link href={intakePath} className="cta_button">Find My Table</Link>
        </div>
      </div>
      <div className="section">
        <h2>A Table That Actually Fits</h2>
        <p>Malve Studios matches the table to you based on your schedule, style, table chemistry, and experience level.</p>
        <p>Our vetted professional Game Masters support online campaigns, in-person campaigns, private groups, events, and long-term D&D or TTRPG tables.</p>
        <p>We serve online players nationwide, support in-person games where our GM network is available, and travel for the right private game or event. Spend more time playing, not searching.</p>
        <p>
          Send us an <Link href="mailto:business@malvestudios.com">email</Link> or set up a{" "}
          <Link href="https://calendly.com/malvestudios/one-shot-conversation?month=2026-05">call with our Coordinator</Link>.
        </p>
      </div>

      {/* <div className="cta_button">View Our Masters</div> */}

      <div className="section dice">
        <div className={`section ${styles.nested_section}`}>
          <h2>Play Anywhere. Find Your Table.</h2>
          <p>Online games shouldn&apos;t feel <b className="blue">random</b>.</p>
          <p>We help <b className="blue">match you</b> to a remote table that actually fits.</p>
          <br />
          <div className={styles.bottom_cta_container}>
            <Link href={intakePath} className="cta_button">Find My Table</Link>
          </div>
        </div>
      </div>
      <div className="section petal">
        <h2>Master Your Games</h2>
        <p><b className="tan">Not every GM is the right GM for </b> your perfect table.</p>
        <p>We help match you with a GM who fits  <b className="tan">the game you actually want to play.</b></p>
        <br />
        <Link href="/contact-us" className="cta_button">Contact Us</Link>
      </div>
    </main>
  );
}

