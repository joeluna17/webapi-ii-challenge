const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("you hit the /api /blogposts endpoint")
})


module.exports = router;