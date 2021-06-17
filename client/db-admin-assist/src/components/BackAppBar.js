import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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

function BackAppBar() {
  let history = useHistory();

  const onBackButtonClickHandler=(e)=>{
    e.preventDefault();
    history.push('/manualupdate');

  }

  const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
          <Toolbar>
              <Fragment>
            <IconButton edge="start" onClick={onBackButtonClickHandler} className={classes.menuButton} color="inherit" aria-label="menu">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SMTM
          </Typography>
          </Fragment>
            </Toolbar>
      </AppBar>

    </div>
    )
}

export default BackAppBar
