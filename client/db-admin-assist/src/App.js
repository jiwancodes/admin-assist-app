import React from 'react'
import Home from './containers/home/Home'
import CombinedTable from './containers/table/CombinedTable'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from './containers/notfound/NotFound';

function App() {
  return (
     /* opening landing page only on /manualupdate path  */
    <Router>
      <div className="App">
        <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/manualupdate' component={CombinedTable}/>
        <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App











