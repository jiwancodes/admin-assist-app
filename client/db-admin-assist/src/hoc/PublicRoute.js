import React from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';


const PublicRoute = ({component: Component, ...rest }) => {
   return(
      <Route {...rest} render={
         (props) => <Component {...rest} {...props} />
       } />
)};

const mapStateToProps = (state) => ({  
   authenticated: state.isAuthenticated,
   user: state.user,
   database:state.database,
 
 });
 export default connect(mapStateToProps)(PublicRoute);
