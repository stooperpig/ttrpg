import styles from './page.module.css';
import Link from "next/link";

export default function ContactUs() {
    return (
        <>
            <div className={`dice_chat ${styles.banner}`}>
                <h2>Contact Us</h2>
            </div>
            <div className={`section ${styles.contact_us}`}>
                <div id="book" className={styles.book}>
                    You got questions about our services? Need help finding that perfect man for the head of your table? Shoot us a message.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:malve.questions@malvestudios.com">malve.questions@malvestudios.com</a>
                    </div>
                </div>


                <div id="business" className={styles.business}>
                    Wanna talk partnerships, opportunites, or join the big leagues? This the email to use. Keep it classy.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:business@malvestudios.com">business@malvestudios.com</a>
                    </div>
                </div>

                <div className={styles.survey}>Know what you want from us? Fill out this <Link className={styles.link} href="/player-response">form</Link></div>

            </div>
        </>
    )
}