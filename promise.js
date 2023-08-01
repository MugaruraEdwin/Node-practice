// Asynchronous function - can go on to run other operations as this one is still processing, doesn't crash a server
async function kitchen(){
    //Error handling
    // try expects a catch(run this optio  first) - 
    try{
        //get a list of students from the database(query)
    }
    catch(error){
        console.log("Failed to return students lsit")
        console.log("",error) // getting the exact error 
    }
    // finally(optional) runs whether the students were gotten or whether they weren't gotten.
    finally{
        console.log("Code runs anyways")
        console.log("Thanlyou for using our service")
    }

}
async function livingroom(){
    //Error handling
    // try expects a catch(run this optio  first) - 
     try{
         //get a list of employees from the database(query)
    }
    catch(error){
        console.log("Failed to return employees lsit")
        console.log("",error) // getting the exact error 
    }
    // finally is optional and runs whether the students were gotten or whether they weren't gotten.
    finally{
        console.log("Code runs anyways")
        console.log("Thanlyou for using our service")
    }
}


