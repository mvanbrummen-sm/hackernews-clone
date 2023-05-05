import React from "react";
import Item from "../Items";

interface Props {
    itemList: [{
        id: number,
        title: string,
        url: string,
        by: string,
        score: number,
        time: number
    }]
}

const Stories = ({itemList}: Props) => (
    <div>
        {itemList.map((item, idx) => <Item key={idx} item={item} index={idx}/>)}
    </div>
);

export default Stories;