import React from "react";
import Link from "next/link";
import styles from './item.module.scss';
import {convertUnixTimeToSince} from "../../lib/utils/dateUtil";
import {getDomain} from "../../lib/utils/urlUtil";
import {Item} from "../../lib/types/item";
import _ from "lodash";

interface Props {
    item: Item,
    index?: number
}

const Item = ({item, index}: Props) => (
    <div className={styles.item}>
        {index !== undefined && <span className={styles.title}>{++index}. </span>}
        { !_.isNil(item.url) && <Link href={item.url} className={styles.title}>{item.title}</Link> }<span className={styles.sitebit}><a
        href={'#'}> ({_.isNil(item.url) ? '' : getDomain(item.url)})</a> </span>
        <div className={styles.sublist}>
            {item.score} points by {item.by} {convertUnixTimeToSince(item.time)} ago | <Link
            href={'/comments/' + item.id}> {item.descendants} comments</Link>
        </div>
    </div>
);

export default Item;