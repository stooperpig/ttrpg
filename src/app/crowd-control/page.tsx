import type { Metadata } from "next";
import MobileCrowdForm from "./mobileCrowdForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Crowd Input | Malve Studios",
  description: "Mobile crowd input for live TTRPG results.",
};

export default function CrowdMobilePage() {
  return (
    <main className={styles.mobilePage}>
      <MobileCrowdForm />
    </main>
  );
}
