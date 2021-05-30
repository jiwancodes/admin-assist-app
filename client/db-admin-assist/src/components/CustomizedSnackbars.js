import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert  from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

//This is material Ui customized snackbar

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
         open={props.open} 
         autoHideDuration={3000}>
        <Alert onClose={handleClose} severity={props.responseData.success?"success":"error"}>
          {props.responseData.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
