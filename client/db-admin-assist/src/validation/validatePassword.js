export default function validate(password1, password2, errors, seterror) {
    if (password1 === password2 && password1.length >= 5) {
        return true;
    } else if (password1 !== password2) {
        var newErr = { ...errors };
        newErr["password2"] = "password didnot match";
        seterror( newErr);
        console.log("error in password validation");
        return false;
    }
    else{
        var newError = { ...errors };
        newError["password1"] = "password too weak(require 5+ character)";
        seterror(newError);
        console.log("error in password validation");
        return false;
    }
}