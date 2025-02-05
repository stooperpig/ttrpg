'use client'

import styles from "./header.module.css";
import Image from 'next/image'
import NavBar from "./nav/nav_bar";
import MobileNav from "./nav/mobile_nav";
import { useState } from "react";
import SocialMedia from "./social_media";
import Link from "next/link";

export default function Header() {
    const [showMobileNav, setShowMobalNav] = useState<boolean>(false);

    const links = [
        { name: 'Home', url: '/' },
        //{ name: 'Masters', url: '/masters' },
        { name: 'Services', url: '/services' },
        //{ name: 'Reserve a GM', url: '/reserve' },
        { name: 'Contact Us', url: '/contact-us' }
    ];

    const toggleMobileNav = () => {
        setShowMobalNav(!showMobileNav);
    }

    const renderMobileHeader = () => {
        if (showMobileNav) {
            return (
                <div className={`${styles.mobile_header_open} menu`}>
                    <div className={styles.mobile_header_open_top}>
                        <div className={styles.logo}>
                            <Link href="/"><Image src="/pro_dm_MS_Logo_White.svg" alt="My SVG" width={44} height={44} /></Link>
                            <span className={styles.studio_logo_text}>MALVE STUDIOS</span>
                        </div>
                        <div className={styles.hamburger} onClick={toggleMobileNav}>
                            <img className={styles.my_svg} src="/MS_MenuButton.svg" alt="My SVG" width={44} height={44} />
                        </div>
                    </div>
                    <div className={styles.mobile_header_open_bottom}>
                        <div className={styles.mobile_header_open_bottom_left}><MobileNav clickHandler={toggleMobileNav} links={links} /></div>
                        <div className={styles.mobile_header_open_bottom_right}><SocialMedia /></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.mobile_header_closed}>
                    <div className={styles.logo}>
                        <Link href="/"> <Image src="/pro_dm_MS_Logo_White.svg" alt="My SVG" width={44} height={44} /> </Link>
                    </div>
                    <div className={styles.hamburger} onClick={toggleMobileNav}>
                        <img className={styles.my_svg} src="/MS_MenuButton.svg" alt="My SVG" width={44} height={44} />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.common_header}>
            <div className={styles.mobile_header}>
                {renderMobileHeader()}
            </div>
            <div className={styles.desktop_header}>
                <div className={styles.logo}>
                    <Link href="/"> <Image src="/pro_dm_MS_Logo_White.svg" alt="My SVG" width={44} height={44} /> </Link>
                    <span className={styles.studio_logo_text}>MALVE STUDIOS</span>
                </div>
                <div className={styles.desktop_nav}><NavBar links={links} /></div>
            </div>
            
            
            {/* //    <!-- Meta Pixel Code --> 
            <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '541454725373855');
                fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=541454725373855&ev=PageView&noscript=1"
            /></noscript>
             <!-- End Meta Pixel Code -->  */}
        </div>
    )


}