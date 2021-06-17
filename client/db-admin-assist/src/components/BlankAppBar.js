import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import { createStyles, makeStyles } from '@material-ui/core/styles';

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


  const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
          <Toolbar>
          <Typography variant="h6" className={classes.title}>
              SMTM
          </Typography>
            </Toolbar>
      </AppBar>

    </div>
    )
}

export default BlankAppBar
