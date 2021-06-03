export default function validate(username) {  
    if (username.length>=3) {
        return true;
    } else {
        console.log("error in username validation");
        return false;   
    }
  }