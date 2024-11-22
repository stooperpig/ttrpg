import Link from "next/link";
import ServicePanel from "../_components/service_panel";
import { Service } from "../_types/types";
import styles from './page.module.css';

export default function Services() {
    const services: Service[] = [{
        title: 'Long-Term Campaign',
        price: 35,
        priceText: 'PER SEAT',
        description: [
            '4 Hour Adventure',
            'Virtual Table Top Service',
            'DM Earns $30/seat'
        ],
        cta: 'Book Your Adventure'
    }, {
        title: 'Drop-In Campaign',
        price: 40,
        priceText: 'PER SEAT',
        description: [
            '4 Hour Adventure',
            'Virtual Table Top Service',
            'DM Earns $35/seat'
        ],
        cta: 'Book Your Adventure'
    }];

    return (
        <>
            <div className="top-section">
                <h2>Services</h2>
            </div>
            <div className={`section ${styles.services}`}>
                Malve Studios has a crew of top-tier Game Masters ready to run the tabletop RPG of your choice. No matter the system or playstyle,
                we know a guy who will keep your adventures smooth and the dice rolling steady.
                <div className={styles.services_list}>
                    {services.map((service: Service, index: number) => {
                        return (<ServicePanel key={index} index={index} service={service} />)
                    })}
                </div>
            </div>
            <div className={`section ${styles.services}`}> 
                <h3 className={styles.h3}>Here&apos;s what we offer:</h3>
                <ul>
                    <li>Dungeons and Dragons 5th Edition (2014 and 2024 rules)</li>
                    <li>Pathfinder 1e and 2e</li>
                    <li>Cyberpunk</li>
                    <li>GURPS</li>
                    <li>Thirsty Sword Lesbians</li>
                    <li>LANCER</li>
                    <li>Blades in the Dark
                        <ul>
                            <li>A Court of Blades</li>
                        </ul>
                    </li>
                    <li>Monster of the Week</li>
                    <li>Rifts</li>
                </ul>
            </div>
            <div className="section">
                <h3 className={styles.h3}>Need something more specific?</h3> <br/>
                <Link href="/contact-us#business"><div className="cta_button">Contact Us</div></Link>
            </div>
        </>
    )
}