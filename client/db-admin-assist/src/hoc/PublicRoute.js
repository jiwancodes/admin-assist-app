import React from 'react';
// import {connect} from 'react-redux';
import {Redirect, Route } from 'react-router-dom';


const PublicRoute = ({component: Component, isAuthenticated, ...rest }) => (
   <Route
      {...rest}
      render = {props => isAuthenticated === false 
      ?(<Component {...props}/>)
       :(<Redirect to="home"/>) }
      /* render ={ (props)=><component {...props}/>} */
   />
);



export default PublicRoute;
