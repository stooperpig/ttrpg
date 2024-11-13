import styles from './page.module.css';
import Link from "next/link";

export default function ContactUs() {
    return (
        <>
            <div className="top-section">
                List of links to different email addresses (based on subject matter)<br/>
                or<br/>
                contact form with inputs (including subject matter drop downs)<br/><br/>
                <Link className={styles.link} href="/player-response">Text with link to player response form</Link>
            </div>
        </>
    )
}