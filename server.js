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

//WE SETUP THE SERVER FROM EXPRESS AND ALSO IMPORT THE FILES THAT WE INTEND TO USE WHERE OUT REQUESTS FOR OUT DECLARED ENDPOINTS ARE
//SEE THE SERVER.USE() THAT SAYS, IN THE FIRST ARG, TELL ME WHERE TO ROUTE TO AND, THEN TELL ME WHAT FILE I SHOULD PULL THE REQUEST
//FROM AND PASS THAT FILE AS THE SECOND ARGUMENT WHICH WE DO JUST AS A CONST WE DECLARE UP TOP USING THE REQUIRE() METHOD 
//IN THIS CASE THE ONLY REAL IMPLEMENTED FILE HERE IS THE 'POST-ROUTER.JS' FILE I JUST MADE THE OTHER TO SHOW HOW WE CAN
//MAKE MULTIPLE ROUTES WHEN WE NEED THEM. CONTINUE TO -> POST-ROUTER.JS FILE