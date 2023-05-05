import React from "react";
import Link from "next/link";

interface Props {
    item: {
        id: number,
        title: string,
        url: string,
        by: string,
        score: number,
        time: number
    }
}

const Item = ({item}: Props) => (
    <div>
        <Link href={item.url}>{item.title}</Link>
    </div>
);

export default Item;