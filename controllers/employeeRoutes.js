const express = require('express')
const Employee = require('../models/employeeModel'); // what we declare up here as the variable must match what we used to create a new object
const router = express.Router();

// employee Route

router.get('/employeeform',(req,res) => {
    res.render('employee.pug');
});

// we add async to make this an aynchronous operation to avoid delays
router.post('/regemployee', async (req,res) => {
    try{
        // use schema name from models
        const employee = new Employee(req.body);
        await employee.save();// mongoose property that saved your object into the database
        console.log(req.body);
        res.redirect('/api/thankyou');  //  redirects the page after posting this data to the path specified below
    }
    catch(error){
        res.status(400).render('employee.pug'); // pug file
        console.log(error);
    }
});


module.exports = router