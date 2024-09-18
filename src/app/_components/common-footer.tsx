import './common-footer.css'
import Link from "next/link";

export default function CommonFooter() {
    return (
        <div className="common-footer">
            Common Footer<br />
            <p>Contains common links and info that apply to all (or at least most pages)</p>
            Temp page links to see pages
            <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/checkout">Checkout</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/masters">Masters</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/order-confirmation">Order Confirmation</Link></li>
                <li><Link href="/schedule">About</Link></li>
            </ul>
        </div>
    );
}