import { React, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import isEmpty from '../../validation/is-empty';
import validateEmail from '../../validation/validateEmail';
import validatePassword from '../../validation/validatePassword';
import validateUser from '../../validation/validateUser';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';
import axios from '../../axios-order';
import { Redirect} from 'react-router-dom';

import LogIn from '../login/Login';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
}));
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

export default function SignIn() {
  const classes = useStyles();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [alertMsg, setalertMsg] = useState("");
  const [errors, seterror] = useState(false);

  const onchangeHandler = (event) => {
    seterror(false);
    if (event.target.name === "username") {
      setusername(event.target.value);
    } if (event.target.name === "email") {
      setemail(event.target.value);
    } if (event.target.name === "password1") {
      setpassword1(event.target.value);
    } if (event.target.name === "password2") {
      setpassword2(event.target.value);
    }

  }

  const onSubmitClickHandler = (event) => {
    event.preventDefault();
    if (isEmpty(username) || isEmpty(email) || isEmpty(password1) || isEmpty(password2)) {
      console.log("field is empty");
      seterror(true);
      setalertMsg("one or more field is empty");
      setshowAlert(true);

    }
    else if (validateEmail(email) && validatePassword(password1, password2) && validateUser(username)) {
      console.log("validaton true")
      const payload = {
        "username": username,
        "email": email,
        "password": password1
      };
      axios.post("/signup", payload).then((response) => {
        console.log(response.data);
        console.log(response.data.success);
        if(response.data.success){
          <Redirect to="/login" />
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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Full Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onchangeHandler}
            value={username}
          />
          {errors ? (<div style={guideStyle}>username must be 3+ characters long</div>) : null}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onchangeHandler}
            value={email}
          />
          {errors ? (<div style={guideStyle}>valid email format example@example.com</div>) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            onChange={onchangeHandler}
            value={password1}
          />
          {errors ? (<div style={guideStyle}>password must be 6+ characters long</div>) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            onChange={onchangeHandler}
            value={password2}
          />
          {errors ? (<div style={guideStyle}>be sure to match password</div>) : null}

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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={LogIn} variant="body2">
                {"have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
         <Copyright /> 
      </Box> */}
    </Container>
  );
}