import { React, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import isEmpty from '../../validation/is-empty';
import validateEmail from '../../validation/validateEmail';
import validateUser from '../../validation/validateUser';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';
import axios from '../../axios-order';
import {Redirect } from 'react-router-dom';
import SignUp from '../signup/Signup';


const useSomeStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})
);

const guideStyle = {
  position: "relative",
  top: "-7px",
  margin: "auto",
  width: "35vw",
  textAlign: "center",
  fontSize: "9.5px",
  fontFamily: "Comfortaa sans-serif",
  boxSizing: "borderbox",
  color: "#f10000"
};

export default function LogIn() {
  const classes = useSomeStyles();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [alertMsg, setalertMsg] = useState("");
  const [errors, seterror] = useState("false");

  const onchangeHandler = (event) => {
    seterror(false);
    if (event.target.name === "username") {
      setusername(event.target.value);
    } if (event.target.name === "password") {
      setpassword(event.target.value);
    }
  }

  const onSubmitClickHandler = (event) => {
    // event.preventDefault();
    if (isEmpty(username) || isEmpty(password)) {
      console.log("field is empty");
      seterror(true);
      setalertMsg("one or more field is empty");
      setshowAlert(true);

    }
    else if (password.length < 6) {
      console.log("password not strong");
      seterror(true);
      setalertMsg("please enter password 6+ characters long");
      setshowAlert(true);
    }
    else if (validateEmail(username) || validateUser(username)) {
      console.log("validaton true")
      const payload = {
        "username": username,
        "password": password
      };
      axios.post("/login", payload).then((response) => {
        console.log(response.data);
        console.log(response.data.success);
        if (response.data.success) {
          <Redirect to="/home" />
        }
      })
    }
    else {
      seterror(true);
      console.log("one of the field is invalid");
      setalertMsg("Invalid form fill");
      setshowAlert(true);

    }

  }



  return (
    <Container component="main" maxWidth="xs">
      <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={alertMsg} severity={false} />

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            /* id="username" */
            label="Username or Email"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onchangeHandler}
            value={username}
          />
          {errors ? (<div style={guideStyle}>Enter valid username or email</div>) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onchangeHandler}
            value={password}
          />
          {errors ? (<div style={guideStyle}>password must be 6+ characters long</div>) : null}

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitClickHandler}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={null} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={SignUp} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}