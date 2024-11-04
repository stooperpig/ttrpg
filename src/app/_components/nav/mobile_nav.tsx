import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './mobile_nav.module.css'
import { NavLink } from '../../_types/types';

interface PropTypes {
    links: NavLink[]
    clickHandler?: () => void
}

export default function MobileNav(props: PropTypes) {
    const pathname = usePathname(); 
    const router = useRouter();

    const handleClick = (pagePath: string) => {
        console.log(`routing to ${pagePath}`);
        if (props.clickHandler !== undefined) {
            props.clickHandler();
        }
        
        router.push(pagePath);
    }

    return(
        <div className={styles.mobile_nav}>
                <ul>
                {props.links.map((link, index) => {
                    const pagePath = link.url;
                    const isActive = pathname === pagePath;
                    console.log(`pathname: ${pathname} pagePath: ${pagePath}`);

                    return (
                        <li key={index} className={styles.navItem} onClick={() => handleClick(pagePath)}>
                            <Link href={pagePath} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                                {link.name}
                            </Link>
                            <hr/>
                        </li>
                    );
                })}
                </ul>
        </div>
    )
}