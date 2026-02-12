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
        cta: 'Book Your Adventure',
        href: "https://www.paypal.com/ncp/payment/K7AD6TV7R7QZJ"
    }, {
        title: 'Drop-In Campaign',
        price: 40,
        priceText: 'PER SEAT',
        description: [
            '4 Hour Adventure',
            'Virtual Table Top Service',
            'DM Earns $35/seat'
        ],
        cta: 'Book Your Adventure',
        href: "https://www.paypal.com/ncp/payment/JP95Z8ZWW7B4G"
    },
    {
        title: 'In-Person Games',
        price: '300-400',
        priceText: 'FOR UP TO 8 PLAYERS',
        description: [
            '4-6 Hour Adventure',
            'In-Person Table Top Service',
            'DM Earns $210/Session',
            'Pays for physical assets and room'
        ],
        cta: 'Book Your Adventure',
        href: "/contact-us"
    }];

    return (
        <>
            <div className="top-section">
                <h2>Services</h2>
            </div>
            <div className={`section ${styles.services}`}>
                Malve Studios has a crew of top-tier Game Masters ready to run the tabletop RPG of your choice. No matter the system or playstyle,
                we have a Pro DM who will keep your adventures smooth and the dice rolling steady. Every vetted GM has remote virtual tabletop accessibility for you
                and your party to roll from wherever you may be located.
                <div className={styles.services_list}>
                    {services.map((service: Service, index: number) => {
                        return (<ServicePanel key={index} index={index} service={service} />)
                    })}
                </div>
            </div>

            {/* <div className={`section ${styles.services}`}>
                <h3 className={styles.h3}>Now Serving the following locations for In-Person Sessions:</h3>
                <ul>
                    <li>Austin, Texas</li>
                    <li>Los Angeles, California</li>
                    <li>Twin Cities, Minnesota</li>
                    <li>Columbus, Ohio</li>
                </ul>
            </div> */}
{/* 
            <iframe className={styles.iframe} src="https://malvestudios.notion.site/ebd/b07ae1ffaa63402281be87d5e94b916d?v=283e3e39b102422983772b22326d5312" width="85%" height="900" frameBorder="0" allowFullScreen />

            <div className={styles.calendar}>
                <p><Link className={styles.link} href="https://malvestudios.notion.site/b07ae1ffaa63402281be87d5e94b916d?v=283e3e39b102422983772b22326d5312">Mobile Friendly Calendar</Link></p>
            </div> */}


            <div className="section">
                <h3 className={styles.h3}>Need something more specific?</h3> <br />
                <Link href="/contact-us#business"><div className="cta_button">Contact Us</div></Link>
            </div>
        </>
    )
}