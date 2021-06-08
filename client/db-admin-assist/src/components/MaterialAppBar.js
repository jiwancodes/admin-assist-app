import React, { Fragment } from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Auth from '../redux/actions/methods'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

// export default 
function MaterialAppBar(props) {
  const location = useLocation()
  const classes = useStyles();
  let history = useHistory();
  const {setdatabase,fetchAllUserDataByDatabase,fetchAllUpdateLogsByDatabase} = props

  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    event.preventDefault();
    setdatabase(event.target.value);
    props.storedatabase(event.target.value);
    console.log(location.pathname);
    location.pathname==='/manualupdate'?
    fetchAllUserDataByDatabase(event.target.value):
    fetchAllUpdateLogsByDatabase(event.target.value);
  }
  
  const onViewUserNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/manualupdate`);
  }
  const onViewLogsNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/logs`);
  }
 const logout=()=>{
   props.storeUser({});
   props.storetoken("");
   localStorage.removeItem('jwtToken');
   localStorage.removeItem('authenticated');
 }
  return (
    <div className={classes.root}>
      <AppBar position="static">
       
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SMTM
          </Typography>
         
          <Fragment>
          <Button value="manualupdate" onClick={onViewUserNavButtonclickHandler}  color="inherit">View Users</Button>
          <Button name="logbutton" onClick={onViewLogsNavButtonclickHandler} color="inherit" value="updatelogs">View Logs</Button>
          <select value={props.database} onChange={onOptionChangeHandler}>
            <option name="npstocks" value="npstock">npstock</option>
            <option name="systemxlite" value="systemxlite">systemxlite</option>
          </select>
          {/* <Button color="inherit">Log Out</Button> */}
          < IconButton className={classes.userlogout} onClick={logout} color="inherit" aria-label="logout">
            <ExitToAppIcon/>
          </IconButton>
          </Fragment>
          {props.isAuthenticated?null :null}
        </Toolbar>
      </AppBar>

    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  // user: state.user,
  database:state.database,

});
const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => {
      console.log("user in dispatch", user);
      dispatch({ "type": 'SET_USER', "payload": user })
    },
    storetoken: (token) => { dispatch({ "type": 'SET_TOKEN', "payload": token }) },
    storedatabase: (database) => { dispatch({ "type": 'SET_DATABASE', "payload": database }) },

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialAppBar);