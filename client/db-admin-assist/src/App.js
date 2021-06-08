import React,{useState} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/home/Home'
import NotFound from './containers/notfound/NotFound'
import Login from './containers/login/Login'
import Signup from './containers/signup/Signup'
// import MaterialAppBar from './components/MaterialAppBar'
// import LandingPage from './containers/landing/LandingPage'

import PrivateRoute from './hoc/PrivateRoute'
// import PublicRoute from './hoc/PublicRoute'
import ProtectedRoute from './hoc/ProtectedRoute'
import UpdateExpiryPage from './containers/updateExpiry/UpdateExpiryPage';
import ViewUpdateLogs from './containers/logs/ViewUpdateLogs';

import store from './redux/store/store'
// import Logs from './containers/logs/Logs';
// import ManualUpdate from './containers/updateExpiry/ManualUpdate';
import axios from './axios-order'

function App() {
//     const [database, setDatabase] = useState("npstock"); 
//     const [rows, setrows] = useState("");
 

//     const fetchAllUserDataByDatabase = (database) => {
//       console.log("fetche data called");
//       axios.get(`/user/details/${database}`).then((response) => {
//           // console.log("here are rows");
//           // console.log(response.data.rows);
//           var tempData = JSON.parse(response.data.rows);
//           setrows(tempData);
//       })
//   }

//   const fetchAllUpdateLogsByDatabase = (database) => {
//     console.log("fetche data called");
//     let payload={
//         "option":database
//     };
//     axios.post(`/updatelogs`,payload).then((response) => {
//       console.log("called update logs");
//         var tempData = JSON.parse(response.data.rows);
//         setrows(tempData);
//     })
//     console.log(rows);
// }
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        {/* <MaterialAppBar 
        database={database}
        setDatabase={setDatabase}
         fetchAllUserDataByDatabase={fetchAllUserDataByDatabase}
         fetchAllUpdateLogsByDatabase={fetchAllUpdateLogsByDatabase}
         /> */}
        <Switch>
          <Route exact path='/'><Redirect to="/login"/></Route>
          <Route exact path='/signup' component={Signup}/>
          {/* <Signup/></Route> */}
          <Route exact path='/login' component={Login}/>
          {/* <Login/></Route> */}
          <ProtectedRoute exact path='/home' component={Home} />
          {/* </PrivateRoute> */}
          <ProtectedRoute exact path='/manualupdate'component={UpdateExpiryPage}/>
          {/* <UpdateExpiryPage/></PrivateRoute> */}
          <ProtectedRoute exact path='/logs' component={ViewUpdateLogs}/>
          {/* <ViewUpdateLogs /></PrivateRoute> */}
          <ProtectedRoute exact path='/notfound' component={NotFound}/>
          {/* <NotFound/></PrivateRoute> */}
          
          <Route ><NotFound/></Route>
          {/* <PrivateRoute exact path='/manualupdate'><UpdateExpiryPage database={database} rows={rows} setrows={setrows}/></PrivateRoute> */}
          {/* <PublicRoute exact path='/signup' component={Signup} /> */}
          {/* <PrivateRoute exact path='/manualupdate' Component={UpdateExpiryPage} />
          <PrivateRoute exact path='/logs' Component={ViewUpdateLogs} />  */}
        </Switch>
      </div>
    </Router>
    </Provider>
  )
}

export default App











