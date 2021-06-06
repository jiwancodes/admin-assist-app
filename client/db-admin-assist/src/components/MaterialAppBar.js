import React from 'react';
import {useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

export default function MaterialAppBar(props) {
  const classes = useStyles();
  let history = useHistory();
  const { database, setdatabase,fetchAllDataByOption} = props

  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    event.preventDefault();
    setdatabase(event.target.value);
    fetchAllDataByOption(event.target.value);
  }
  
  const onViewUserNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/manualupdate`);
  }
  const onViewLogsNavButtonclickHandler = (event) => {
    event.preventDefault();
    history.push(`/logs`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button value="manualupdate" onClick={onViewUserNavButtonclickHandler}  color="inherit">View Users</Button>
          <Button name="logbutton" onClick={onViewLogsNavButtonclickHandler} color="inherit" value="updatelogs">View Logs</Button>
          <select value={database} onChange={onOptionChangeHandler}>
            <option name="npstocks" value="npstock">npstock</option>
            <option name="systemxlite" value="systemxlite">systemxlite</option>
          </select>
          {/* <Button color="inherit">Log Out</Button> */}
          < IconButton className={classes.userlogout} color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

    </div>
  );
}
