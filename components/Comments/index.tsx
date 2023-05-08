import React, {useState} from "react";
import {Item} from "../../lib/types/item";
import {Comments} from "../../lib/types/comments";
import {convertUnixTimeToSince} from "../../lib/utils/dateUtil";
import styles from './comments.module.scss';
import _ from "lodash";

interface Props {
    item: Item,
    comments: Comments[]
}

const Comments = ({item, comments}: Props) => (
    <div>
        {comments.map((comment, idx) => <Comment key={idx} comment={comment} depth={0}/>)}
    </div>
);

const Comment = ({comment, depth = 1}: { comment: Comments, depth: number }) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={styles.comment} style={{marginLeft: depth * 10}}>
            <div
                className={styles.user}>{comment.item.by}<span> {convertUnixTimeToSince(comment.item.time)} ago</span> | <a
                href={'javascript:void(0)'}
                onClick={() => setCollapsed(!collapsed)}>[{collapsed ? comment.children.length + ' more' : '-'}]</a>
            </div>
            <div hidden={collapsed}>
                <div dangerouslySetInnerHTML={{__html: comment.item.text}}></div>
                <div>
                    {comment.children && !_.isEmpty(comment.children) &&
                        comment.children.map((childComments, idx) => <Comment key={idx} comment={childComments}
                                                                              depth={depth + 1}/>)}
                </div>
            </div>
        </div>
    )
}

export default Comments;