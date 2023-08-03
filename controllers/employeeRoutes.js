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
  
  // returning db data in table format
  router.get('/list', async (req,res) =>{
    // async operation becasue we are having a db operation taking place
    try{
        let items = await Employee.find();// get everything - sql equivalent to SELECT * FROM employees // items stores the items retrieved
        res.render('employeelist',{employees: items});
    }
    catch(error){
        console.log(error);
        return res.status(400).send({message: "Sorry, couldn't retrieve employees"}); // whatever you put afetr the return is usually not read in your function 
    }
});





module.exports = router