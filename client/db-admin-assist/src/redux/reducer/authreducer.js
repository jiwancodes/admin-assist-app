import isEmpty from '../../validation/is-empty';

const initialState = {
   database:"npstock",
   isAuthenticated:localStorage.getItem('authenticated'),
   user:localStorage.getItem('user'),

};

 const authreducer=(state = initialState, action)=>{
    switch(action.type){

              case 'SET_USER':
                 return {
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                    user:action.payload
                 };
                 case 'SET_DATABASE':
                 return {
                    ...state,
                    database:action.payload
                 };
              case 'SET_TOKEN':           
                  return{
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                    token:action.payload
                  }
        
              default:
                 return state;
           }

}
export default authreducer;
