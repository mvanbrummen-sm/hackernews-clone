export interface Comments {
    item: CommentItem,
    children: Comments[]
}

export interface CommentItem {
    id: number,
    by: string,
    text: string,
    time: number,
    type: string,
    parent: number,
}