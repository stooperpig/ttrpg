import type { Metadata } from "next";
import CrowdControl from "./crowdControl";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Crowd Control | Malve Studios",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrowdControlPage() {
  return (
    <main className={styles.controlPage}>
      <CrowdControl />
    </main>
  );
}
