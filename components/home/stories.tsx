import React from "react";
import Item from "./item";

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
        {itemList.map(item => <Item item={item}/>)}
    </div>
);

export default Stories;