import React, { Fragment, useState} from 'react';
import { useHistory} from 'react-router-dom';
// import { useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MaterialSideDrawer from './MaterialSideDrawer';
import {isAuthenticated} from '../methods/actions'
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
  const dispatch = useDispatch();
  // const location = useLocation()
  const classes = useStyles();
  let history = useHistory();
  // const [authenticated, setauthenticated] = useState(isAuthenticated());
  const [state, setState] = useState({ left: false });
  // useEffect(() => {
  //   if(isAuthenticated()){
  //     setauthenticated(true);
  //   }
  // }, [authenticated])
  
  
  
  const onOptionChangeHandler = (event) => {
    event.preventDefault();
    // setdatabase(event.target.value);
    // console.log(location.pathname);
    dispatch({ "type": 'SET_DATABASE', "payload": event.target.value })
    props.storedatabase(event.target.value);
  }
  
  const onViewUserNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/manualupdate`);
  }
  const onViewLogsNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/logs`);
  }
  
  const toggleDrawer = (anchor, open) => ( event,) => {
    if (
      event.type === 'keydown' &&
      ((event).key === 'Tab' ||
      (event).key === 'Shift')
      ) { return; }
      setState({ ...state, [anchor]: open });
    };
    
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <MaterialSideDrawer state={state} toggleDrawer={toggleDrawer} />
          <Toolbar>
          <Fragment>
            <IconButton edge="start" onClick={toggleDrawer("left", true)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SMTM
          </Typography>

            <Fragment>
              <Button value="manualupdate" onClick={onViewUserNavButtonclickHandler} color="inherit">View Users</Button>
              <Button name="logbutton" onClick={onViewLogsNavButtonclickHandler} color="inherit" value="updatelogs">View Logs</Button>
              <select value={props.database} onChange={onOptionChangeHandler}>
                <option name="npstocks" value="npstock">npstock</option>
                <option name="systemxlite" value="systemxlite">systemxlite</option>
              </select>
              {/* < IconButton className={classes.userlogout} onClick={logout} color="inherit" aria-label="logout">
            <ExitToAppIcon/>
          </IconButton> */}
            </Fragment>
            </Fragment>
        {/* {authenticated?
          : null} */}
          </Toolbar>
      </AppBar>

    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  // user: state.user,
  database: state.database,

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