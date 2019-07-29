import React from 'react';
import CommentsContainer from './CommentsContainer'






const Posts = props =>{
    return (
        <div>
            <h2>{props.post.title}</h2>
            <p>{props.post.contents}</p>
            <span>created at: {props.post.created_at}</span><span>updated at: {props.post.updated_at}</span>
            <h2>Comments:</h2>
            <button onClick={()=>{props.getPostComments(props.post.id)}}>Get Comments</button>
                {
                     props.comments && <CommentsContainer comments ={ props.comments }/>
                }       
            <hr/>
        </div>
    )
}

export default Posts;