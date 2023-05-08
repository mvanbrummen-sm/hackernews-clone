export const getItem = async (id: number | string) => {
    const res = await fetch(process.env.API_URL + `/item/${id}.json`)
    return res.json()
}