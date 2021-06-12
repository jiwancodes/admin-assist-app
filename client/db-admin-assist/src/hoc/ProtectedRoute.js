import React from 'react';
import {connect} from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import {isAuthenticated,isLoginTimeExpired} from '../methods/actions';

const ProtectedRoute = ({ component: Component,...rest }) => {
  const isauthenticated= isAuthenticated()&&!isLoginTimeExpired();
    // console.log("authenticated:",isauthenticated);
  return (
    <Route {...rest} render={
      (props) => isauthenticated?<Component {...rest} {...props} />:<Redirect to="/login"/>
    } />
  )
}
const mapStateToProps = (state) => ({  
    user: state.user,
    database:state.database,  
  });
  

export default connect(mapStateToProps) (ProtectedRoute);