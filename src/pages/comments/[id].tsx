import React from "react";
import {useRouter} from "next/router";
import Item from "../../../components/Item";
import {Item as ItemType} from "../../../lib/types/item";

interface Props {
    item: ItemType
}

export default function Home(props: Props) {
    const router = useRouter()
    const {id} = router.query
    return (
        <>
            <Item item={props.item}></Item>

        </>
    )
}

export async function getServerSideProps(context: any) {
    const {id} = context.query
    const res = await fetch(process.env.API_URL + `/item/${id}.json`)
    const item = await res.json()

    return {
        props: {
            item:
                {
                    id: item.id,
                    title: item.title,
                    url: item.url,
                    by: item.by,
                    score: item.score,
                    time: item.time,
                    descendants: item.descendants
                }

        }
    }
}