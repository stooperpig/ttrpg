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
                    You got questions about our services? Need help finding that perfect person for the head of your table? Shoot us a message.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:malve.questions@malvestudios.com">malve.questions@malvestudios.com</a>
                    </div>
                </div>


                <div id="business" className={styles.business}>
                    Wanna talk partnerships, opportunites, or join the big leagues? This is the email to use. Keep it classy.<br />
                    <div className={styles.email}>
                        Email: <a href="mailto:business@malvestudios.com">business@malvestudios.com</a>
                    </div>
                </div>

                <div className={styles.survey}>
                    <p>Interested in joining a game or getting one started with your people? Fill out the form below and we will reach out ASAP to get you setup with a GM that is ready and waiting for you.</p>
                        <p><Link className={styles.link} href="https://malvestudios.notion.site/12d1b67a744e8028ab50fd2725091aff">Player Survey Form</Link></p>
                </div>
            </div>
        </>
    )
}