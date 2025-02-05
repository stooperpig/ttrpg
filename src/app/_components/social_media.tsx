import styles from './social_media.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SocialMedia() {
    const buttons = [
        { src: 'pro_dm_MS_Social_Blusky.svg', url: 'https://bsky.app/profile/malvestudios.bsky.social/' },
        { src: 'pro_dm_MS_Social_Discord.svg', url: 'https://discord.gg/9JnmWbWXZA' },
        { src: 'pro_dm_MS_Social_Email.svg', url: 'mailto:business@malvestudios.com' }, // Email link
        { src: 'pro_dm_MS_Social_Facebook.svg', url: 'https://www.facebook.com/profile.php?id=61567293238716' },
    ];

    return (
        <div className={styles.social_media}>
            <div className={styles.social_media_buttons}>
                {buttons.map((button, index) => (
                    <Link href={button.url} key={index} target="_blank" rel="noopener noreferrer">
                        <Image src={button.src} alt={`Link to ${button.url}`} width={44} height={44} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
