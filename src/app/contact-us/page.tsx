import styles from './page.module.css';
import Link from "next/link";

export default function ContactUs() {
    return (
        <>
            <div className="top-section">
                <p>You got questions about our services? Need help finding that perfect man for the head of your table? Shoot us a message.</p>
                Email: <a href="mailto:malve.questions@malvestudios.com">malve.questions@malvestudios.com</a>
                <div id="book">
                </div>
                
                <p>Wanna talk partnerships, opportunites, or join the big leagues? This the email to use. Keep it classy.</p>
                Email: <a href="mailto:business@malvestudios.com">business@malvestudios.com</a>
                <br /><br />
                Know what you want from us? Fill out this <Link className={styles.link} href="/player-response">form</Link>
            </div>
        </>
    )
}