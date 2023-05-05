import React from "react";
import Link from "next/link";
import styles from './item.module.scss';

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

const convertUnixTime = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
}

const convertUnixTimeToSince = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);

    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
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