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
                <h1>Services</h1>
                <p>Need verbage for this page</p>
            </div>
            <div className="section">
                <div className={styles.services_list}>
                    {services.map((service: Service, index: number) => {
                        return (<ServicePanel key={index} service={service} />)
                    })}
                </div>
            </div>
            <div className="section">List of Games?</div>
            <div className="section">
                List of Future offering?<br /><br />
                <div className="cta_button">Contact Us</div>
            </div>
        </>
    )
}