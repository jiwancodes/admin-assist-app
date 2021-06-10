import jwt_decode from 'jwt-decode';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';


export const decryptStoredToken = () => {
    try{
    const encryptedToken = localStorage.getItem('jwtToken');
    var decryptedToken = CryptoAES.decrypt(encryptedToken.toString(), 'fafhao#4fa');
    console.log("decryptedToken", decryptedToken);
    console.log("decryptedToken", decryptedToken.toString(CryptoENC));
    // return decryptedToken;
    return decryptedToken.toString(CryptoENC);
    }
    catch(e){
        return true;

    }
}

export const encryptAndStoreTokenAndUserName = (token) => {
    var ciphertext = CryptoAES.encrypt(token, 'fafhao#4fa');
    console.log(ciphertext);
    localStorage.setItem('jwtToken', ciphertext);
    // localStorage.setItem('authenticated',true);
    var decoded = jwt_decode(token);
    localStorage.setItem('user', decoded.newUser.username);

}


export const isAuthenticated = () => {
    console.log("is auth called");
    try{
   const  token=localStorage.getItem('jwtToken');
    if (token!==""||token!==null) {
        var encoded = decryptStoredToken();
        var decoded = jwt_decode(encoded);
        console.log("decoded email", decoded.newUser.username);
        if (decoded.newUser.username && decoded.newUser.email) {
            return (true)
        } else {
            return false;
        }
    }
    else{
        return false;
    }
}catch(e){
    console.log(e);
    return false;
}

}


export const logUserOut = () => dispatch => {
    console.log("logout called");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    dispatch({
        type: 'SET_USER',
        payload: {}
    });
};

