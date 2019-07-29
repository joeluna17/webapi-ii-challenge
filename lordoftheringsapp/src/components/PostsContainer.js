import React from 'react';
import axios from 'axios';
import Posts from './Posts';
import { Route , Link } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';


class PostsContainer extends React.Component {

    state = {
        posts: [],
        comments: [],
        error: ""
    }

    componentDidMount(){
        this.getData()
        
    }

    getData = async () => {
        const {data} = await axios.get('http://localhost:5000/api/posts')
        try{
            this.setState({
                posts: data,
                error:""
                
            })
                console.log(this.state.posts)
        }
        catch{
            this.setState({
                error: data
            })
        }
    }


     getPostComments = async (id) => {
        const {data} = await axios.get(`http://localhost:5000/api/posts/${id}/comments`)
        try{
            this.setState({
                comments: data
            })
        }
           
        catch{
            console.log("comments")
        }
    }
    

    render(){
        return (
            <div>
                <h1>If you Love some LOTR you are home.<br/> Post something!</h1>
                <hr/>

            <div>
                {
                this.state.posts.map(post => {
                   return(
                       <div>
                       <Posts post={post} key={post.id}  getPostComments={this.getPostComments} comments={this.state.comments}/>
                       </div>
                    )
                })
               
                }
            </div>

            </div>
        )
    }
}

export default PostsContainer;