import type { Metadata } from "next";
import LiveResults from "./liveResults";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Crowd Results | Malve Studios",
  description: "Live finalized crowd results.",
};

export default function CrowdResultsPage() {
  return (
    <main className={styles.resultsPage}>
      <LiveResults />
    </main>
  );
}
