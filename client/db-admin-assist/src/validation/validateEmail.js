function validateEmail(email) {
  //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export default function validate(email,errors,seterror) {
  
    if (validateEmail(email)) {
        return true;
    } else {
      var newErr = {...errors};
      newErr["email"] = "valid email format example@example.com";
      seterror(newErr);
      // seterror("valid email format example@example.com");
      console.log("error in email validation");
        return false;
    }
  }