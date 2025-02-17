import styles from './page.module.css';
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div>
            <div className={`dice_chat ${styles.banner}`}>
                <h2>Privacy Policy</h2>
            </div>
            <div className={`section ${styles.services}`}>
                <h3 className={styles.h3}>Malve Studios Privacy Policy Effective 2/17/2025</h3>
                <ol>
                    <li> Introduction<br />
                        Welcome to Malve Studios. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our website, you agree to this policy.</li>
                    <li> Information We Collect<br /> We may collect the following types of information:<br />

                        Personal Information: Name, email address, phone number, payment details, and other relevant information provided voluntarily. <br />

                        Usage Data: IP address, browser type, operating system, referral source, pages visited, and time spent on our website.<br />

                        Cookies and Tracking Technologies: We use cookies and similar technologies to enhance user experience and analyze website performance.</li>
                    <li> How We Use Your Information<br />
                        We use collected information for the following purposes:<br />

                        To provide and personalize our services.<br />

                        To process transactions securely.<br />

                        To communicate with you about updates, offers, and support.<br />

                        To improve our website functionality and user experience.<br />

                        To enforce our terms and policies and ensure security.</li>
                    <li> Data Protection and Security<br />
                        We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. <br />
                        However, no online platform can guarantee absolute security. <br />
                        By using our services, you acknowledge and accept this risk.</li>
                    <li> Sharing of Information<br />
                        We do not sell, trade, or rent your personal data. However, we may share information with trusted third parties for the following purposes:<br />

                        Payment processing and fraud prevention.<br />

                        Website analytics and performance monitoring.<br />

                        Compliance with legal obligations or law enforcement requests.</li>
                    <li> Your Rights and Choices<br />
                        You have the following rights concerning your data:<br />

                        Access and Correction: You may request access to or correction of your personal information.<br />

                        Opt-Out: You may opt out of marketing communications at any time.<br />

                        Data Deletion: You may request deletion of your personal data, subject to legal obligations.</li>
                    <li>Third-Party Links<br />
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</li>
                    <li>Changes to This Policy<br />
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date</li>
                    <li>Contact Us<br />
                    If you have any questions about this Privacy Policy, you may contact us at:<br />

                        Malve Studios<br />
                        Chuck Baker<br/>
                        1509 N 7th St. Temple, Texas 76501<br />
                        business@malvestudios.com<br/>
<br/>
<br/>
                        By using our website, you consent to the terms of this Privacy Policy.</li>
                </ol>

            </div>
        </div>)
}
