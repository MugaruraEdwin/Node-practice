const express = require('express');
const router = express.Router();


// Home route
router.get('/thankyou',(req,res) => {
    res.render('thankyou.pug');
});









module.exports = router