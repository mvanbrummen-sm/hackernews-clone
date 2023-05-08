import React from "react";
import {useRouter} from "next/router";
import Item from "../../../components/Item";
import {Item as ItemType} from "../../../lib/types/item";
import {NextPageContext} from "next/dist/shared/lib/utils";
import {Comments as CommentsType} from "../../../lib/types/comments";
import _ from "lodash";
import Comments from "../../../components/Comments";

interface Props {
    item: ItemType,
    comments: CommentsType[]
}

export default function Home(props: Props) {
    const router = useRouter()
    const {id} = router.query
    return (
        <>
            <Item item={props.item}></Item>
            <Comments item={props.item} comments={props.comments}></Comments>
        </>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const {id} = context.query
    const res = await fetch(process.env.API_URL + `/item/${id}.json`)
    const item = await res.json()

    return {
        props: {
            item: {
                id: item.id,
                title: item.title,
                url: item.url,
                by: item.by,
                score: item.score,
                time: item.time,
                descendants: item.descendants
            },
            comments: _.isNil(item.kids) ? [] : await getComments(item.kids)
        }
    }
}

async function getComments(kids: number[]): Promise<Comments[]> {
    const promises = kids.map(async (id: number) => {
        const res = await fetch(process.env.API_URL + `/item/${id}.json`)
        return res.json()
    })
    const result = await Promise.all(promises)

    return Promise.all(result
        .filter((item: any) => item.type === 'comment' && !_.isNil(item.text) && !_.isNil(item.by))
        .map(async (item: any) => {
                return {
                    item: {
                        id: item.id,
                        by: item.by,
                        parent: item.parent,
                        text: item.text,
                        time: item.time,
                        type: item.type,
                    },
                    children: _.isNil(item.kids) ? [] : await getComments(item.kids)
                }
            }
        ))
}