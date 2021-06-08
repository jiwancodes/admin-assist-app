class Auth{
    constructor(){
        this.isAuthenticated=false
    }
    login(cb){
        this.isAuthenticated=true;
        cb()
    }
    logout(cb){
        this.isAuthenticated=false;
        cb()
    }
    testIsAuthenticated(){
        return this.isAuthenticated
    }

}   
export default Auth



























// export const logUserOut = () => dispatch => {
//     //Delete token
//     localStorage.removeItem('jwtToken');

//     //Remove auth header
//     // setAuthToken(false);
//     //Set current user to {}
//     dispatch(setUser({}));
//     dispatch(() => {
//         return {
//             "type": 'SET_TOKEN',
//             "payload": ""
//         }
//     }
//     );

// }
// export const setUser = (decoded) => {
//     return {
//         type: "SET_USER",
//         payload: decoded
//     };
// };
