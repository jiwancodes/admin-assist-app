import React from 'react'
import Home from './containers/home/Home'
import Combined from './containers/table/Combined'
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
     /* opening landing page only on /manualupdate path  */
    <Router>
      <div className="App">
        {/* <Route exact path='/' component={() => (<Redirect to='/manualupdate' />)}/> */}
        <Route exact path='/' component={Combined}/>

        <Route exact path='/manualupdate' component={Home}/>
      </div>
    </Router>
  )
}

export default App











