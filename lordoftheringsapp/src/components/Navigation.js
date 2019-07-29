import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => {

    return(
        <div>
            <NavLink exact to='/' activeClassName="selected">Home</NavLink>
            <NavLink exact to='/api/posts' activeClassName="selected">Blog Posts</NavLink>
        </div>
    )

}

export default Navigation