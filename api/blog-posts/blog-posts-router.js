const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("you hit the /api /blogposts endpoint This is just here to see how we can break up different request to interact and modify different data when we need to that lives in the database.")
})


module.exports = router;