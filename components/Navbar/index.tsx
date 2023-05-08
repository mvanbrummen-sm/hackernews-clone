import React from "react";
import styles from './navbar.module.scss';
import Link from "next/link";

const Navbar = () => (
    <div className={styles.pagetop}>
        <b><Link className={styles.hnname} href={'/'}>Hacker News</Link></b> | <Link href={'/newest'}>new</Link> | <Link
        href={'/past'}>past</Link> | <Link href={'/comments'}>comments</Link> | <Link href={'/ask'}>ask</Link> | <Link
        href={'/show'}>show</Link> | <Link href={'/jobs'}>jobs</Link> | <Link href={'/submit'}>submit</Link>
    </div>
);

export default Navbar