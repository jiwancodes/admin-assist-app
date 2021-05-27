import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Route,Redirect} from 'react-router-dom';

function App() {
  return (
     /* opening landing page only on /manualupdate path  */
    <Router>
      <div className="App">
        <Route exact path='/' component={() => (<Redirect to='/manualupdate' />)}/>
        <Route exact path='/manualupdate' component={Home}/>
      </div>
    </Router>
  )
}

export default App











