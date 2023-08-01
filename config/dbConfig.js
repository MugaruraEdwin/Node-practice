const mongoose = require('mongoose');

// making connection to database using an asynchronous function
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI) // process .env tells application to go and check in .env file 
        console.log(`MongoDB connected at: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`MongoDB coonection error ${error}`)
        process.exit(1); // means close attempted connection to our DB
    }
}

module.exports = connectDB