import styles from './social_media.module.css';
import Image from 'next/image'

export default function SocialMedia() {
    const buttons = [
        'MS_Social_Blusky.svg',
        'MS_Social_Discord.svg',
        'MS_Social_Email.svg',
        'MS_Social_Facebook.svg',
        
    ];

    return (
        <div className={styles.social_media}>
            <p>Social Media</p>
            <div className={styles.social_media_buttons}>
                {buttons.map((value: string, index: number) => {
                    return <Image src={value} key={index} alt="" width={44} height={44} />
                })}
            </div>
        </div>
    )
}