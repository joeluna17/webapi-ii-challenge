const express = require('express');
const db = require('../../data/db.js');
const router = express.Router();

//GET ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await db.find()
        res.status(200).json(posts)
    }
    catch{
        res.status(500).json({ success: false, message: "The post information cannot be recieved." })
    }
})

//GET POST BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const post = await db.findById(id)

    try {
        if (post) {
            res.status(200).json(post)
        } else {// THERE IS AN ISSUE HERE WE NEED THE DATABASE TO BE UNDEFINED NOT EMPTY
            res.stautus(404).json({ success: false, message: "The post with that specified ID does not exsist." })
        }
    }
    catch{
        res.status(500).json({ success: false, message: "The post information cannot be retrieved." })
    }
})

//GET POST COMMENTS BY ID
router.get('/:id/comments', async (req,res) => {
    const {id} = req.params;
    const comments = await db.findCommentById(id);

    try{
        if(comments){
            res.status(200).json(comments)
        } else{// THERE IS AN ISSUE HERE WE NEED THE DATABASE TO BE UNDEFINED NOT EMPTY
            res.status(404).json({success: false, message: "The post with the specified ID does not exsist."})
        }
    }
    catch{
        res.status(500).json({success:false, message:"The comments information cannot be recieved"})
    }
})

//POST TO BLOG POSTS
router.post('/', async (req, res) => {
    const newPost = req.body; 

    try{
        if(newPost.title === "" || newPost.contents === ""){
            res.status(404).json({success:false, message: "Please provide a title and contents for the post."})
        } else{
            const addedPost = await db.insert(newPost);
            res.status(201).json(addedPost)
        }
    }
    catch{
            res.status(500).json({success: false, message:"There was an error while saving the post to the database."})
    }
})


module.exports = router;