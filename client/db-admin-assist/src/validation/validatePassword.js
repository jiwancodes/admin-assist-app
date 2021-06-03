export default function validate(password1,password2) {  
    if (password1===password2&&password1.length>=6) {
        return true;
    } else {
        console.log("error in password validation");
        return false;
    }
  }