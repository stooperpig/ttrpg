import { Service } from '../_types/types'
import styles from './service_panel.module.css'

interface PropTypes {
    service: Service
    key: number
}

export default function ServicePanel(props: PropTypes) {
    return(
        <div className={styles.service_panel} key={props.key}>
            service name<br/>
            prices ($xx over PER SEAT)<br/>
            <hr/>
            description (multiple lines centered)<br/>
            <button>Book Your Adventure</button>
        </div>
    )
}