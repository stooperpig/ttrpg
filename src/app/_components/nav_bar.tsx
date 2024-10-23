// components/NavBar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav_bar.module.css';

export default function NavBar() {
    const pathname = usePathname();  // Get the current pathname

    const links = [
        { name: 'Home', url: '/' },
        { name: 'Masters', url: '/masters' },
        { name: 'Services', url: '/services' },
        { name: 'Reserve a GM', url: '/reserve' },
        { name: 'Contact Us', url: '/contact-us' }
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {links.map((link, index) => {
                    const pagePath = link.url;
                    const isActive = pathname === pagePath;
                    console.log(`pathname: ${pathname} pagePath: ${pagePath}`);

                    return (
                        <li key={index} className={styles.navItem}>
                            <Link href={pagePath} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};