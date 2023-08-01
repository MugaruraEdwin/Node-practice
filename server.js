const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config(); // brings in dotenv 
const connectDB = require('./config/dbConfig'); // imported database connection
const port = process.env.PORT || 4000; //  go to .env file get port and assign it to 3000if it doenst exist assign it directly to 4000

const app = express();

// importing module(file) helloRoutes - enables us have access to the hello routes file 
const helloRoutes = require('./controllers/helloRoutes')
const homeRoutes = require('./controllers/homeRoutes')
const employeeRoutes = require('./controllers/employeeRoutes')

// When it is formatted in the front end it is grouped togther as an object, so this only focuses on inputs(encoded:false)
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // convert data received into json format

connectDB();  //calling the database connection

// setting up pug as the view engine
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

//setting up directory for static files 
app.use(express.static(path.join(__dirname, 'public')));

//using imported routes
app.use('/api', helloRoutes)
app.use('/api', homeRoutes)
app.use('/api', employeeRoutes)

// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname,'index.html'));
// });

// app.get('/about',(req,res) => {
//     res.sendFile(path.join(__dirname,'about.html'));
// });


// running the  server on specific port in this case: 3000
// this should always be the last line in the server file
app.listen(port,() => console.log(`Server is now running at http://localhost:${port}`));
