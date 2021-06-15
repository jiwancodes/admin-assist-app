import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

//Higher Order Routes
import PublicRoute from './hoc/PublicRoute'
import ProtectedRoute from './hoc/ProtectedRoute'

//Components
import NotFound from './containers/notfound/NotFound'
import Login from './containers/login/Login'
import UpdateExpiryPage from './containers/updateExpiry/UpdateExpiryPage';
import ViewUpdateLogs from './containers/logs/ViewUpdateLogs';
import Signup from './containers/signup/Signup'
import AdminOnlyRoute from './hoc/AdminOnlyRoute';


// import Home from './containers/home/Home'


function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <ProtectedRoute exact path='/home' component={Home} /> */}
          <Route exact path='/'><Redirect to="/login"/></Route>
          <PublicRoute exact path='/login' component={Login}/>
          <ProtectedRoute exact path='/manualupdate'component={UpdateExpiryPage}/>
          {/* <ProtectedRoute exact path='/signup' component={Signup}/> */}
          <AdminOnlyRoute exact path='/signup' component={Signup}/>
          <ProtectedRoute exact path='/logs' component={ViewUpdateLogs}/>
          <ProtectedRoute exact path='/notfound' component={NotFound}/>          
          <Route ><NotFound/></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App











