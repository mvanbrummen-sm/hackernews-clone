import React from "react";
import Item from "../Item";
import {Item as ItemType} from "../../lib/types/item";
import Link from "next/link";
import styles from './stories.module.scss';

interface Props {
    itemList: ItemType[],
    page: number
}

const Stories = ({itemList, page}: Props) => (
    <div>
        {itemList.map((item, idx) => <Item key={idx} item={item} index={idx} page={page}/>)}
        <div className={styles.more}>
            <Link href={`/?p=${page + 1}`}>More</Link>
        </div>
    </div>
);

export default Stories;