import React from 'react';
import Comment from './Comment';




const PostContainer = props => {
    return (
        <div>
            {
                props.comments.map(comment => {
                    return <Comment comment={comment} key={comment.id}/>
                })
            }

        </div>
    )
}

export default PostContainer;