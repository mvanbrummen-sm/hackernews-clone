import React from "react";
import Link from "next/link";
import styles from './item.module.scss';
import {convertUnixTimeToSince} from "../../lib/dateUtil";

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
        <span>{++index}. </span>
        <Link href={item.url}>{item.title}</Link>
        <div>
            {item.score} points by {item.by} {convertUnixTimeToSince(item.time)} ago
        </div>
    </div>
);

export default Item;