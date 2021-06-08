import React from 'react';
import {connect} from 'react-redux';
import { Route, useHistory,Redirect } from 'react-router-dom'; 



const PrivateRoute = ({childern, isAuthenticated,...rest}) => {

  console.log("private route authentication status",isAuthenticated);
  return( 
  <Route
      {...rest}
      render ={() => isAuthenticated===true ? {childern} :<Redirect to="/login"/>}   /> 
   )
};
const mapStateToProps = (state) => ({
   isAuthenticated: state.isAuthenticated,
   user: state.user,
   database:state.database, 
 });

 export default connect(mapStateToProps)(PrivateRoute);

// export default PrivateRoute;
