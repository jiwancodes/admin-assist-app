import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialSideDrawer from './MaterialSideDrawer';

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
    formControl: {
      backgroundColor:'white',
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

// export default 
function MaterialAppBar(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = useState({ left: false });
 

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

  const toggleDrawer = (anchor, open) => (event,) => {
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
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-native-simple">APP</InputLabel> */}
                <Select
                  native
                  value={props.database}
                  onChange={onOptionChangeHandler}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option name="npstocks" value="npstock">Npstock</option>
                  <option name="systemxlite" value="systemxlite">Systemxlite</option>
                </Select>
              </FormControl>
            </Fragment>
          </Fragment>
        </Toolbar>
      </AppBar>

    </div>
  );
}
const mapStateToProps = (state) => ({
  database: state.database,

});
const mapDispatchToProps = (dispatch) => {
  return {
    storedatabase: (database) => { dispatch({ "type": 'SET_DATABASE', "payload": database }) },

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialAppBar);