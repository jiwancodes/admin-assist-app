import React from 'react';
import {connect} from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component,authenticated, ...rest }) => {
    console.log("authenticated:",authenticated);
  return (
    <Route {...rest} render={
      (props) => authenticated?<Component {...rest} {...props} />:<Redirect to="/login"/>
    } />
  )
}
const mapStateToProps = (state) => ({  
    authenticated: state.isAuthenticated,
    user: state.user,
    database:state.database,
  
  });

export default connect(mapStateToProps) (ProtectedRoute);