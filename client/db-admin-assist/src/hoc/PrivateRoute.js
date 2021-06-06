import React from 'react';
// import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom'; 



const PrivateRoute = ({component: Component, auth, ...rest}) => {
   <Route
      {...rest}
      render ={(props) => (auth.isAuthenticated === true) //fake auth check
         ? (<Component {...props} />)
         : (<Redirect to='/login'/>)
      }
   />
};


export default PrivateRoute;
