const express = require('express');
const router = express.Router();


// Hello Route

router.get('/hello',(req,res) => {
    res.render('hello.pug');
});

// landing page route 

router.get('/landing',(req,res) => {
    res.render('landing.pug');
});



module.exports = router