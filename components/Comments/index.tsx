import React from "react";
import {Item} from "../../lib/types/item";
import {Comments} from "../../lib/types/comments";
import {convertUnixTimeToSince} from "../../lib/utils/dateUtil";
import styles from './comments.module.scss';

interface Props {
    item: Item,
    comments: Comments[]
}

const Comments = ({item, comments}: Props) => (
    <div>
        {comments.map((comment, idx) => <Comment key={idx} comment={comment}/>)}
    </div>
);

const Comment = ({comment}: { comment: Comments }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.user}>{comment.item.by}<span> {convertUnixTimeToSince(comment.item.time)} ago</span>
            </div>
            <div>{comment.item.text}</div>
        </div>
    )
}

export default Comments;