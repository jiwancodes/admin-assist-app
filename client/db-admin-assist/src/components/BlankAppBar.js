import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {isAuthenticated} from '../methods/actions'
import { useHistory} from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';

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

function BlankAppBar() {
  let history = useHistory();
  const authenticated = isAuthenticated();

  const onBackButtonClickHandler=(e)=>{
    e.preventDefault();
    history.push('/manualupdate');

  }

  const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
          <Toolbar>
            {authenticated?
            <Fragment>
            <IconButton edge="start" onClick={onBackButtonClickHandler} className={classes.menuButton} color="inherit" aria-label="menu">
              <KeyboardBackspaceIcon />
            </IconButton>
              </Fragment>:null}
            </Toolbar>
      </AppBar>

    </div>
    )
}

export default BlankAppBar
