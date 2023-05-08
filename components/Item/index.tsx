import React from "react";
import Link from "next/link";
import styles from './item.module.scss';
import {convertUnixTimeToSince} from "../../lib/dateUtil";
import {getDomain} from "../../lib/urlUtil";

interface Props {
    item: {
        id: number,
        title: string,
        url: string,
        by: string,
        score: number,
        time: number
    },
    index: number
}

const Item = ({item, index}: Props) => (
    <div className={styles.item}>
        <span className={styles.title}>{++index}. </span>
        <Link href={item.url} className={styles.title}>{item.title}</Link><span className={styles.sitebit}><a href={'#'}> ({getDomain(item.url)})</a> </span>
        <div className={styles.sublist}>
            {item.score} points by {item.by} {convertUnixTimeToSince(item.time)} ago
        </div>
    </div>
);

export default Item;