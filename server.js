const express = require('express');
const blogPostsRouter = require('./api/blog-posts/blog-posts-router.js');
const postsRouter = require('./api/posts/posts-router.js');
const server = express();


server.use(express.json());
server.use('/api/blog-posts', blogPostsRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res)=>{  // This is where the homepage/landing page will be routed to
    res.send(`
        <h2>Blog Post App</h2>
        <p>Welcome to the Blogs post app!</p>
    `);
});

module.exports = server;
