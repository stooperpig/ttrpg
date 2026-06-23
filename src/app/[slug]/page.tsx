import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../_components/JsonLd";
import styles from "../_components/marketing_page.module.css";
import { marketingPageMap, marketingPages } from "../_lib/marketingPages";
import { breadcrumbSchema, faqSchema, intakePath, pageMetadata } from "../_lib/seo";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const page = marketingPageMap.get(slug);

  if (!page) {
    return {};
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function MarketingPageRoute({ params }: PageParams) {
  const { slug } = await params;
  const page = marketingPageMap.get(slug);

  if (!page) {
    notFound();
  }

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.h1, path: page.path },
    ]),
    faqSchema(page.faq),
  ];

  return (
    <main className={styles.page}>
      <JsonLd data={schema} />
      <section className={`section ${styles.hero}`}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Malve Studios</p>
          <h1>{page.h1}</h1>
          <p className={styles.intro}>{page.intro}</p>
          <div className={styles.ctaRow}>
            <Link href={intakePath} className="cta_button">Start Player Intake</Link>
            <Link href="/" className={styles.textLink}>Back to Malve Studios</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        {page.sections.map((section) => (
          <section className={styles.sectionBlock} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </section>

      <section className={`section ${styles.faq}`}>
        <div className={styles.content}>
          <h2>FAQ</h2>
          {page.faq.map((item) => (
            <section className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={`section ${styles.links}`}>
        <h2>Keep Exploring</h2>
        <div className={styles.linkGrid}>
          <Link href="/" className={styles.textLink}>Malve Studios Homepage</Link>
          <Link href={intakePath} className={styles.textLink}>Player Intake Form</Link>
          {page.related.map((link) => (
            <Link href={link.href} className={styles.textLink} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
