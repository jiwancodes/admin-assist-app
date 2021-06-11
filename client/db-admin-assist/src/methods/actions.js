import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';


export const decryptStoredToken = () => {
    if (localStorage.getItem('jwtToken')) {
        const encryptedToken = localStorage.getItem('jwtToken');
        var decryptedToken = CryptoAES.decrypt(encryptedToken.toString(), 'fafhao#4fa');
        // console.log("decryptedToken", decryptedToken);
        // console.log("decryptedToken", decryptedToken.toString(CryptoENC));
        // return decryptedToken;
        return decryptedToken.toString(CryptoENC);
    } return null;


}

export const encryptAndStoreTokenAndUserName = (token) => {  
    var logintime= moment().format('lll');
    var cypherTime = CryptoAES.encrypt(logintime, 'fafhao#4fa');
    localStorage.setItem('loginTime', cypherTime);
    var ciphertext = CryptoAES.encrypt(token, 'fafhao#4fa');
    localStorage.setItem('jwtToken', ciphertext);
    var decoded = jwt_decode(token);
    // console.log('time is',decoded.newUser.loginTime);    
    localStorage.setItem('user', decoded.newUser.username);

}


export const isAuthenticated = () => {
    // console.log("is auth called");
    try {
        const token = localStorage.getItem('jwtToken');
        if (token !== "" || token !== null) {
            var encoded = decryptStoredToken();
            var decoded = jwt_decode(encoded);
            // let presentTime= moment(new Date());
            // let loginTime=moment(decoded.newUser.loginTime);
            // console.log('time is',decoded.newUser.loginTime);
            // console.log('Present time is',presentTime);
            // console.log(presentTime.diff(loginTime, 'minutes'));
            // var elapsedTime= presentTime.diff(decoded.newUser.loginTime,'minutes');
            // console.log("elapsed time is",elapsedTime);
            if (decoded.newUser.username && decoded.newUser.email) {
                return (true)
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const isLoginTimeExpired=()=>{
    try {
        const token = localStorage.getItem('jwtToken');
        if (token !== "" || token !== null) {
            var encoded = decryptStoredToken();
            var decoded = jwt_decode(encoded);
            let presentTime= moment(new Date());
            let loginTime=moment(decoded.newUser.loginTime);           
            // console.log(presentTime.diff(loginTime, 'minutes'));
            var elapsedTime= presentTime.diff(loginTime,'minutes');
            console.log("elapsed time is",elapsedTime);
            if (elapsedTime<19) {
                return (false)
            } else {
                logUserOut();
                return true;
            }
        }
        else {
            logUserOut();
            return true;
        }
    } catch (e) {
        console.log(e);
        logUserOut();
        return true;
    }

}


export const logUserOut = () => dispatch => {
    let history = useHistory();
    console.log("logout called");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    console.log(localStorage.getItem('jwtToken'));
    history.push('/login');
};

