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
        // get everything - sql equivalent to SELECT * FROM employees // items stores the items retrieved
        let items = await Employee.find();
        // Aggregating age
        let ages = await Employee.aggregate([
            // grouping by id, can also be grouped by name / category or otherwise
            {$match: { 
                gender: 'female'
            }},
            {
                $group: {
                _id: '$all',
                totalAge: { $sum: '$age'},
                femaleEmployees: {$sum: 1}

            }
            }
            // let ages =  group{totalAge{sum}}
            // If I create another array, then thats when I would move to array index[1], basing on which the groups
             ])

        let all = await Employee.aggregate([
            {
                $group: {
                _id: '$all',
                totalAges: { $sum: '$age'},
                totalEmployees: {$sum: 1}
            
            }
            }
            ])
    console.log(ages)
    console.log(ages[0])
    // console.log(all)
    res.render('employeelist',{employees:items, empAges:ages[0].totalAge,femTotal:ages[0].femaleEmployees, empTotal:all[0].totalEmployees, ageTotal:all[0].totalAges }); // would have also been ages:ages (parsing same vaiable into same variable)
    }
    catch(error){
        console.log(error);
        // whatever you put afetr the return is usually not read in your function 
        return res.status(400).send({message: "Sorry, couldn't retrieve employees"}); 
    }
});


// delete route 
router.post('/employee/delete', async (req,res) => {
    try{
        await Employee.deleteOne({_id: req.body.id}); // deleting id based on what has been parsed in in the front end (pug changes)
        res.redirect('back');
    }
    catch(error){
        res.status(400).send("Unable to delete item from the database")
    }
})


// update route - involves get and post

// first get form 
router.get('/employee/edit/:id', async (req,res) => {
    try{
        const emp = await Employee.findOne({_id: req.params.id}); // can also be req.params.value if we were editing the value
        res.render('editemployee', {employee:emp});
    }
    catch(error){
        res.status(400).send('Could not find employee in database');
        console.log(error); // for debugging purposes only
    }
})

// edit it 
router.post('/employee/edit', async (req,res) => {
    try{
        await Employee.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/list')
    }
    catch(error){
        res.status(400).send('Could not edit employee data');
        console.log(error);
    }
} )

module.exports = router