import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './mobile_nav.module.css'

interface PropTypes {
    clickHandler?: () => void
}

export default function MobileNav(props: PropTypes) {
    const pathname = usePathname();  // Get the current pathname
    const router = useRouter();
    
    const links = [
        { name: 'Home', url: '/' },
        { name: 'Masters', url: '/masters' },
        { name: 'Services', url: '/services' },
        { name: 'Reserve a GM', url: '/reserve' },
        { name: 'Contact Us', url: '/contact-us' }
    ];

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
                {links.map((link, index) => {
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