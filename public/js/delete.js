const Confirm = (event) => {
    const result = confirm("Are you sure you want to proceed?");
    if (result) {
      // The user clicked 'OK', perform the delete action here.
      console.log("The record is successfully deleted");
    } else{
      // The user clicked 'Cancel', handle the cancellation here.
      event.preventDefault();
    }
  };


  