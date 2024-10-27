'use client'

import styles from "./header.module.css";
import Image from 'next/image'
import NavBar from "./nav_bar";
import MobileNav from "./mobile_nav";
import { useState } from "react";
import SocialMedia from "./social_media";

export default function Header() {
    const [showMobileNav, setShowMobalNav] = useState<boolean>(false);

    const toggleMobileNav = () => {
        setShowMobalNav(!showMobileNav);
    }

    const renderMobileHeader = () => {
        if (showMobileNav) {
            return (
                <div className={`${styles.mobile_header_open} menu`}>
                    <div className={styles.mobile_header_open_top}>
                        <div className={styles.logo}>
                            <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
                            <span className={styles.studio_logo_text}>MALVE STUDIOS</span>
                        </div>
                        <div className={styles.hamburger} onClick={toggleMobileNav}>
                            <img className={styles.my_svg} src="/MS_MenuButton.svg" alt="My SVG" width={44} height={44} />
                        </div>
                    </div>
                    <div className={styles.mobile_header_open_bottom}>
                        <div className={styles.mobile_header_open_bottom_left}><MobileNav clickHandler={toggleMobileNav}/></div>
                        <div className={styles.mobile_header_open_bottom_right}><SocialMedia/></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.mobile_header_closed}>
                    <div className={styles.logo}>
                        <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
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
                    <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
                    <span className={styles.studio_logo_text}>MALVE STUDIOS</span>
                </div>
                <div className={styles.desktop_nav}><NavBar /></div>
            </div>

        </div>
    )
}