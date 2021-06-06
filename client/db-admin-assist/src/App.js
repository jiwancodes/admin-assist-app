import React from 'react'
import Home from './containers/home/Home'
import CombinedTable from './containers/table/CombinedTable'
import NotFound from './containers/notfound/NotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/login/Login'
import Signup from './containers/signup/Signup'
import LandingPage from './containers/landing/LandingPage'

// import PrivateRoute from './hoc/PrivateRoute'
import PublicRoute from './hoc/PublicRoute'

function App() {
  return (
    /* opening landing page only on /manualupdate path  */
    <Router>
      <div className="App">
        <Switch>
          {/* <PublicRoute exact path="/signup" component={Signup} /> */}
          {/* <PublicRoute exact path="/login" component={Login} /> */}
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/signup' component={Signup} />
          <PublicRoute exact path='/login' component={Login} isAuthenticated={false}/> 
          <Route exact path='/home' component={Home} />
          <Route exact path='/manualupdate' component={CombinedTable} />
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App











