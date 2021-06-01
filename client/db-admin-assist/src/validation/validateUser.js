export default function validate(username) {  
    if (username.length()>=3) {
        return true;
    } else {
        return false;   
    }
  }