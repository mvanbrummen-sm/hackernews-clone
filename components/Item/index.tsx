import React from "react";
import Link from "next/link";
import styles from './item.module.scss';
import {convertUnixTimeToSince} from "../../lib/utils/dateUtil";
import {getDomain} from "../../lib/utils/urlUtil";
import {Item} from "../../lib/types/item";
import _ from "lodash";
import {STORIES_PAGE_SIZE} from "../../lib/constants";

interface Props {
    item: Item,
    index?: number,
    page: number
}

const Item = ({item, index, page}: Props) => (
    <div className={styles.item}>
        {index !== undefined && <span className={styles.title}>{++index + (page * STORIES_PAGE_SIZE)}. </span>}

        {!_.isNil(item.url) && <Link href={item.url} className={styles.title}>{item.title}</Link>}<span
        className={styles.sitebit}>

        <a href={'#'}> ({_.isNil(item.url) ? '' : getDomain(item.url)})</a> </span>

        <div className={styles.sublist}>
            {item.score} points by {item.by} {convertUnixTimeToSince(item.time)} ago | <Link
            href={'/comments/' + item.id}> {item.descendants} comments</Link>
        </div>
    </div>
);

export default Item;