import styles from './page.module.css';
import Link from "next/link";
import { intakePath, pageMetadata } from "../_lib/seo";

export const metadata = pageMetadata({
    title: "Contact Malve Studios",
    description: "Contact Malve Studios about player intake, online campaigns, in-person games, partnerships, and professional Game Master services.",
    path: "/contact-us",
});

export default function ContactUs() {
    return (
        <>
            <div className={`dice_chat ${styles.banner}`}>
                <h2>Contact Us</h2>
            </div>
            <div className={`section ${styles.contact_us}`}>
                <div id="book" className={styles.book}>
                    Want to schedule an In-Person Session? Have other questions about our services? Shoot us a message.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:malve.questions@malvestudios.com">malve.questions@malvestudios.com</a>
                    </div>
                </div>


                <div id="business" className={styles.business}>
                    Wanna talk partnerships, opportunites, or join the big leagues? Use this email. Keep things classy.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:business@malvestudios.com">business@malvestudios.com</a>
                    </div>
                </div>

                <div className={styles.survey}>
                    <p>Interested in joining an online game or getting one started with your people? Fill out the form below and we will reach out ASAP to get you setup with a GM that is ready and waiting for you.</p>
                        <p><Link className={styles.link} href={intakePath}>Player Survey Form</Link></p>
                </div>
            </div>
        </>
    )
}
