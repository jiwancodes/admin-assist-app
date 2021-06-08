import { React, useState} from 'react'
import axios from '../../axios-order';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MaterialAppBar from '../../components/MaterialAppBar'
import PrivateRoute from '../../hoc/PrivateRoute'
import ManualUpdate from '../updateExpiry/ManualUpdate';
import Logs from '../logs/Logs';
function Home(props) {
  const [database, setDatabase] = useState("npstock"); 
    const [rows, setrows] = useState("");
 

    const fetchAllUserDataByDatabase = (database) => {
      console.log("fetche data called");
      axios.get(`/user/details/${database}`).then((response) => {
          // console.log("here are rows");
          // console.log(response.data.rows);
          var tempData = JSON.parse(response.data.rows);
          setrows(tempData);
      })
  }

  const fetchAllUpdateLogsByDatabase = (database) => {
    console.log("fetche data called");
    let payload={
        "option":database
    };
    axios.post(`/updatelogs`,payload).then((response) => {
        // console.log("here are rows");
        // console.log(response.data.rows);
        var tempData = JSON.parse(response.data.rows);
        setrows(tempData);
    })
}

  return (
    <Router>
    <div>
      <MaterialAppBar database={database} setDatabase={setDatabase} />
      <Switch>
      <PrivateRoute exact path='/manualupdate'><ManualUpdate database={database} rows={rows} setrows={setrows}/></PrivateRoute>
          <PrivateRoute exact path='/logs'><Logs database={database}/></PrivateRoute>
      </Switch>


    </div>
    </Router>
  )
}
// const mapStateToProps = (state) => ({
//   user:state.user,
//   isAuthenticated: state.isAuthenticated,
//   token: state.token
// });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeUser: (user) => { dispatch({ "type": 'SET_USER', "payload": user }) },

//   }
// };
export default Home
// export default connect(mapStateToProps)(Home);
