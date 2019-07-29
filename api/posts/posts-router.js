const express = require('express'); 
const db = require('../../data/db.js'); // database we import. this is done in all files that will need to access the defined database methods
const router = express.Router(); //Here we are using Router() class inside of express instead of just default express this allows us to modularize

//GET ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await db.find() // this is a database method that is associated with the get verb and is programmed to execute certain functions depending on the pathname 
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

//GET POST COMMENTS BY POST ID
router.get('/:id/comments', async (req,res) => {
    const {id} = req.params;
    const comments = await db.findPostComments(id);
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

//POST COMMENTS TO POSTS
router.post('/:id/comments', async (req, res) => {
    const {id} = req.params;
    const newComment = req.body;
    const exisitingPost = await db.findById(id)
    try{   
        if(exisitingPost){
                if(newComment.text === ""){
                        res.status(400).json({success:false, message:"Please provide text for the comment."})
                    } else{
                        const comment = await db.insertComment(newComment)
                        res.status(201).json(comment)
                    }
        } else{
            res.status(404).json({success:false, message: "The post with the ID does not exsist."})
        }
    }
    catch{
            res.status(500).json({success:false, message:"There was an error while saving the comment to the database."})
    }
})


//UPDATE A EXSISITING POST
router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const newPostUpdates = req.body
    const exisitingPost = await db.findById(id)
    try{
        if(exisitingPost){
            if(newPostUpdates.title === "" || newPostUpdates.contents === ""){
                res.status(400).json({success: false, message:"Please provide title and contents for the post."})
            } else{
                const updatedPost = await db.update(id, newPostUpdates)
                res.status(200).json(updatedPost)
            }
        }else{
            res.status(404).json({success: false, message:"Post with specified ID does not exsist."})
        }
    }
    catch{
            res.status(500).json({success:false, message:"The information posted cannot be modified."})
    }
})
 

//DELETE POST
router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
   const removedPost = await db.remove(id)
    try {
        removedPost?
        res.status(200).end() :
        res.status(404).json({success: false, message: "The post with specified ID does not exsist."})
    }
    catch{
        res.status(500).json({success: false, message: "The post could not be removed."})
    }
})



module.exports = router;

//FINALLY WE ARE HAVE COME TO OUT IMPLEMENTED HTTP REQESTS THAT HANDLE THE ENDPOINT WE TOLD EXPRESS TO POINT TO
//NOTICE THAT WE ARE USING router INSTEAD OF server AS WE HAVE IN THE PAST AND THAT IS BECUASE WE ARE NOW 
//USING THE ROUTER() CLASS TO IMPLEMENT THE POSSIBLE USE OF MULTIPLE ROUTES AND ADVISE EXPRESS THAT WE INTEND TO 
//TAKE ADVATANGE OF THE CLASS METHODS AND ATTRIBUTES. REALLY, THE BIGGEST DIFFERENCE HERE TO NOTICE AS THAT WE ARE 
//USING '/' HERE AND NOT THE FULL ENDPOINT / PATH NAME WHEN WE USE THE HTTP VERBS. THIS IS BECAUSE WE HAVE ALLREADY
//ADVISE EXPRESS WHERE WE ARE ALREADY IN THE SERVER.JS FILE IN THE server.use('/api/posts', this_file) AND WE KNOW
//TO AUTOMATICALLY APPEND THAT PATH NAME. ALSO, THIS FILE, BECUASE WE ARE USING THE ROUTER() CLASS, IT BECOMES MINI
//APP OF ITS OWN.