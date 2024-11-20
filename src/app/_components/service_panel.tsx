import Link from 'next/link'
import { Service } from '../_types/types'
import styles from './service_panel.module.css'

interface PropTypes {
    service: Service
    index: number
}

export default function ServicePanel(props: PropTypes) {
    return(
        <div className={`${styles.service_panel} `} key={props.index}>
            <h3>{props.service.title}</h3>
            <div className={styles.campaign_price}><span className={styles.campaign_dollar_sign}>$</span>{props.service.price}</div>
            <div className={styles.campaign_price_text}>{props.service.priceText}</div>
            <div className={styles.hr_container}><hr/></div>
            <div className={styles.campaign_description}>
            {props.service.description.map((text: string, index: number) => {
                return(
                    <div key={index}>{text}</div>
                )
            })}
            </div>
            <br/>
            <Link href="/contact-us#book"><div className="cta_button">{props.service.cta}</div></Link>
        </div>
    )
}