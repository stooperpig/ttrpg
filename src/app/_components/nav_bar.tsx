// components/NavBar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav_bar.module.css';

export default function NavBar() {
    const pathname = usePathname();  // Get the current pathname

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {['Home', 'Masters', 'Services', 'Reserve a GM', 'Contact Us'].map((page, index) => {
                    const pagePath = `/${page.toLowerCase() === 'home' ? '' : page.toLowerCase()}`;
                    const isActive = pathname === pagePath;

                    return (
                        <li key={index} className={styles.navItem}>
                            <Link href={pagePath} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                                {page}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};