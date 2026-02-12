import Link from "next/link";
import styles from './page.module.css';
import { Referral } from "@/app/_types/types";
import ReferralPanel from "@/app/_components/referral_panel";

export default function Referraltag() {
    const service: Referral = {

        cta: 'Book Your Planning Call',
        href: "https://calendly.com/malvestudios/one-shot-conversation"
    };
    return (
        <>
            <div className={`dice_chat ${styles.banner}`}>
                <h2>Private Dungeons & Dragons</h2>
            </div>
            <div className={`section ${styles.referral}`}>
                <div id="book" className={styles.book}>
                    <h2>Referred by Emerald Tavern</h2>
                    We provide vetted, Professional Dungeon Masters for private D&D experiences across Austin.<br />
                    Whether it's a birthday, a friend gathering, or a serious campaign launch - we handle everything. <br />
                    <br/>
                    What You Get: <ul>
                        <li>3-5 hour professionally run session</li>
                        <li>Custom adventure tailored to your group</li>
                        <li>All materials provided (dice, maps, minis, etc.)</li>
                        <li>Suitable for new or experienced players</li>
                        <li>Flexible scheduling (Friday-Sunday availability)</li> </ul>
                    Investment:<ul>
                        <li>$400 per private session</li>
                        <li> Up to 8 players</li>
                    </ul>
                    How it works:<ol>
                        <li>Book a 15-minute planning call below</li>
                        <li>We discuss your group, experience level, and preferred date</li>
                        <li>We schedule your private session</li>
                        <li>After booking, we'll coordinate with your full group to prepare</li>
                    </ol>
                    <div className={styles.email}>
                        <ReferralPanel key={0} index={0} service={service} />
                    </div>
                </div>
            </div>
        </>
    )
}