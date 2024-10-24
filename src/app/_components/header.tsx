'use client'

import styles from "./header.module.css";
import Image from 'next/image'
import NavBar from "./nav_bar";

export default function Header() {
    return (
        <div className={styles.common_header}>
            <div className={styles.mobile_header}>
                <div className={styles.logo}>
                    <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
                </div>
                <div className={styles.hamburger}>
                    <img className={styles.my_svg} src="/MS_MenuButton.svg" alt="My SVG" width={44} height={44} />
                </div>
            </div>
            <div className={styles.desktop_header}>
                <div className={styles.logo}> 
                    <Image src="/MS_Logo_White.svg" alt="My SVG" width={44} height={44} />
                    <span className={styles.studio_logo_text}>MALVE STUDIOS</span>
                </div>
                <div className={styles.nav}><NavBar/></div>
            </div>

        </div>
    )
}