import styles from './service.module.css'


export default function Service() {
    return(
        <div className={styles.service}>
            service name<br/>
            prices ($xx over PER SEAT)<br/>
            <hr/>
            description (multiple lines centered)<br/>
            <button>Book Your Adventure</button>
        </div>
    )
}