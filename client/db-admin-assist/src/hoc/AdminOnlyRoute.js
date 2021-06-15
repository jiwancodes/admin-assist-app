import React from 'react';
import {connect} from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import {isAuthenticated,isLoginTimeExpired} from '../methods/actions';

const AdminOnlyRoute = ({ component: Component,...rest }) => {
    const user = localStorage.getItem('user');
  const isauthenticated= isAuthenticated()&&!isLoginTimeExpired();
    // console.log("authenticated:",isauthenticated);
  return (
    <Route {...rest} render={
      (props) => isauthenticated&&user==='admin'?<Component {...rest} {...props} />:<Redirect to="/login"/>
    } />
  )
}
const mapStateToProps = (state) => ({  
    user: state.user,
    database:state.database,  
  });
  

export default connect(mapStateToProps) (AdminOnlyRoute);