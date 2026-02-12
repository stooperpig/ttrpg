import Link from 'next/link'
import { Referral } from '../_types/types'
import styles from './referral_panel.module.css'

interface PropTypes {
    service: Referral
    index: number
}

export default function ReferralPanel(props: PropTypes) {
    return(
        <div className={`${styles.referral_panel} `} key={props.index}>
        
                    <Link href={props.service.href}><div className="cta_button">{props.service.cta}</div></Link>
        </div>
    )
}