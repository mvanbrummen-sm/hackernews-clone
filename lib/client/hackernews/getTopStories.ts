import {getItem} from "./getItem";

export const getTopStories = async (pageStart: number, pageEnd: number) => {
    const res = await fetch(process.env.API_URL + `/topstories.json`)
    const ids = await res.json()
    return await Promise.all(ids.slice(pageStart, pageEnd).map(getItem))
}
