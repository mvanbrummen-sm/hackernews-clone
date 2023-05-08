import {Inter} from 'next/font/google'
import React from "react";
import Stories from "../../components/Stories";
import {Item} from "../../lib/types/item";
import _ from "lodash";
import Navbar from "../../components/Navbar";

const inter = Inter({subsets: ['latin']})

interface Props {
    data: Item[]
}

export default function Home({data}: Props) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <Navbar/>
            <Stories itemList={data}/>
        </main>
    )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.API_URL + '/topstories.json')
    const data = await res.json()

    const promises = data.slice(0, 30).map(async (id: number) => {
        const res = await fetch(process.env.API_URL + `/item/${id}.json`)
        return res.json()
    })

    const result = await Promise.all(promises)
    const formattedData = result.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                url: _.isUndefined(item.url) ? null : item.url,
                by: item.by,
                score: item.score,
                time: item.time,
                descendants: item.descendants
            }
        }
    )

    return {
        props: {
            data: formattedData
        }
    }
}