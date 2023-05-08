import React from "react";
import Item from "../../../components/Item";
import {Item as ItemType} from "../../../lib/types/item";
import {NextPageContext} from "next/dist/shared/lib/utils";
import {Comments as CommentsType} from "../../../lib/types/comments";
import _ from "lodash";
import Comments from "../../../components/Comments";
import Navbar from "../../../components/Navbar";
import {Inter} from "next/font/google";
import {getItem} from "../../../lib/client/hackernews";

const inter = Inter({subsets: ['latin']})

interface Props {
    item: ItemType,
    comments: CommentsType[]
}

export default function CommentsPage(props: Props) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <Navbar/>
            <Item item={props.item}></Item>
            <Comments item={props.item} comments={props.comments}></Comments>
        </main>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const {id} = context.query

    const item = await getItem(id as string)

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
    const promises = kids.map(getItem)
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