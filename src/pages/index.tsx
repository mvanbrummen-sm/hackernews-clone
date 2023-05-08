import {Inter} from 'next/font/google'
import React from "react";
import Stories from "../../components/Stories";
import {Item} from "../../lib/types/item";
import _ from "lodash";
import Navbar from "../../components/Navbar";
import {NextPageContext} from "next/dist/shared/lib/utils";
import {useSearchParams} from "next/navigation";
import {STORIES_PAGE_SIZE} from "../../lib/constants";
import {getTopStories} from "../../lib/client/hackernews";

const inter = Inter({subsets: ['latin']})

interface Props {
    data: Item[]
}

export default function Home({data}: Props) {
    const searchParams = useSearchParams();

    const p = searchParams?.get('p')

    const page = _.isNil(p) ? 0 : parseInt(p as string, 10)

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <Navbar/>
            <Stories itemList={data} page={page}/>
        </main>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const {p} = context.query

    const page = _.isNil(p) ? 0 : parseInt(p as string, 10)
    const pageStart = page * STORIES_PAGE_SIZE
    const pageEnd = (page * STORIES_PAGE_SIZE) + STORIES_PAGE_SIZE

    const topStories = await getTopStories(pageStart, pageEnd)

    const formattedData = topStories.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                url: _.isUndefined(item.url) ? null : item.url,
                by: item.by,
                score: item.score,
                time: item.time,
                descendants: item.descendants || []
            }
        }
    )

    return {
        props: {
            data: formattedData
        }
    }
}