import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route } from 'react-router-dom';


const PublicRoute = ({component: Component, isAuthenticated, ...rest }) => {
   return(
   <Route
      {...rest}
      render = {props => isAuthenticated === false 
      ?(<Component {...props}/>)
       :(<Redirect to="home"/>) }
      /* render ={ (props)=><component {...props}/>} */
   />
)};

const mapStateToProps = (state) => ({  
   isAuthenticated: state.isAuthenticated,
   user: state.user,
   database:state.database,
 
 });
 export default connect(mapStateToProps)(PublicRoute);
