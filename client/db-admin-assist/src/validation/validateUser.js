export default function validate(username,errors,seterror) {  
    if (username.length>=3) {
        return true;
    } else {
        var newErr = {...errors};
      newErr["username"] = "Enter valid username of length 3+ character";
      seterror(newErr);
        console.log("error in username validation");
        return false;   
    }
  }