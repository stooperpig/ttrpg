import Link from 'next/link';
import styles from './footer.module.css'
import Image from 'next/image'
import SocialMedia from './social_media';

export default function Footer() {
    return (
        <div className={styles.common_footer}>
            <SocialMedia/>
            <div className={styles.logo}>
                <Link href="/">
                <Image src="/pro_dm_MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
                </Link>
            </div>
            <div><span className={styles.copyright}>&#169;</span>Malve Studios 2024. All Rights Reserved.</div>
        </div>
    );
}

