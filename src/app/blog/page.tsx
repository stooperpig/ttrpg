import { Suspense } from 'react';
import BlogPanel from '../_components/blog/blog_panel';
import styles from './page.module.css';

export default function ProDMBlog() {

    return (
        <div>
            <div className={`dice_chat ${styles.banner}`}>
                <h2>Blog</h2>
            </div>
            <div className={`section ${styles.services}`}>
                <Suspense>
                    <BlogPanel />
                </Suspense>
            </div>
        </div>)
}
