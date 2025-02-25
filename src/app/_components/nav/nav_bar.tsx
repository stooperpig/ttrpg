// components/NavBar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav_bar.module.css';
import { NavLink } from '../../_types/types';

interface PropTypes {
    links: NavLink[]
}

export default function NavBar(props: PropTypes) {
    const pathname = usePathname();  // Get the current pathname

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {props.links.map((link, index) => {
                    const pagePath = link.url;
                    let isActive = false;
                    if (pagePath.length > 1) {
                        isActive = pathname.startsWith(pagePath);
                    } else {
                        isActive = pathname === pagePath;
                    }

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