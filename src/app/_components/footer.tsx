import styles from './footer.module.css'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className={styles.common_footer}>
            <div className={styles.logo}>
                <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
            </div>
            <p><span className={styles.copyright}>&#169;</span>Malve Studios 2024. All Rights Reserved.</p>
        </div>
    );
}