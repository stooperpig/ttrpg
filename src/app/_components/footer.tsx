import Link from 'next/link';
import styles from './footer.module.css'
import Image from 'next/image'
import SocialMedia from './social_media';

const footerLinks = [
    { name: "What Is Malve Studios?", href: "/what-is-malve-studios" },
    { name: "TTRPG Player Matchmaking", href: "/ttrpg-player-matchmaking" },
    { name: "Professional Game Master Services", href: "/professional-game-master-services" },
    { name: "Online D&D Campaigns", href: "/online-dnd-campaigns" },
    { name: "In-Person D&D Campaigns", href: "/in-person-dnd-campaigns" },
    { name: "How Malve Studios Vets Game Masters", href: "/how-malve-vets-game-masters" },
    { name: "Professional Dungeon Master Cost", href: "/how-much-does-a-professional-dungeon-master-cost" },
];

export default function Footer() {
    return (
        <div className={styles.common_footer}>
            <SocialMedia/>
            <div className={styles.logo}>
                <Link href="/">
                <Image src="/pro_dm_MS_Logo_White.svg" alt="Malve Studios home" width={44} height={44} />
                </Link>
            </div>
            <nav className={styles.footer_nav} aria-label="Malve Studios informational pages">
                {footerLinks.map((link) => (
                    <Link href={link.href} key={link.href}>{link.name}</Link>
                ))}
            </nav>
            <div className={styles.utility_links}>
                <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
            <div><span className={styles.copyright}>&#169;</span>Malve Studios 2024. All Rights Reserved.</div>
        </div>
    );
}

