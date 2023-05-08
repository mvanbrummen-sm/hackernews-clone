import React from "react";
import Item from "../Item";
import {Item as ItemType} from "../../lib/types/item";

interface Props {
    itemList: ItemType[]
}

const Stories = ({itemList}: Props) => (
    <div>
        {itemList.map((item, idx) => <Item key={idx} item={item} index={idx}/>)}
    </div>
);

export default Stories;