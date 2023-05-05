import {Inter} from 'next/font/google'
import React from "react";
import Stories from "../../components/Stories";

const inter = Inter({subsets: ['latin']})

interface Props {
    data: [{
        id: number,
        title: string,
        url: string,
        by: string,
        score: number,
        time: number
    }]
}

export default function Home({data}: Props) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <h1>hackernews</h1>
            <Stories itemList={data}/>
        </main>
    )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.API_URL + '/topstories.json')
    const data = await res.json()

    const promises = data.slice(0, 10).map(async (id: number) => {
        const res = await fetch(process.env.API_URL + `/item/${id}.json`)
        return res.json()
    })

    const result = await Promise.all(promises)
    const formattedData = result.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                url: item.url,
                by: item.by,
                score: item.score,
                time: item.time
            }
        }
    )

    return {
        props: {
            data: formattedData
        }
    }
}