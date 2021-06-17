import React from 'react'
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import axios from '../axios-order';
import CustomizedSnackbars from './CustomizedSnackbars'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getHeader} from '../methods/actions'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import isEmpty from '../validation/is-empty';
import validatePassword from '../validation/validatePassword';



// import Button from '@material-ui/core/Button';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
    }
};
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


function PasswordChangeModal(props) {
    let history = useHistory()
    const classes = useStyles();
    const header = getHeader();
    const [password1, setpassword1] = React.useState("");
    const [password2, setpassword2] = React.useState("");
    const [errors, seterror] = React.useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [showAlert, setshowAlert] = React.useState(false);
    const [responseData, setresponseData] = React.useState(false);


    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        history.push('/login');
    }
    
    const onchangeHandler = (event) => {
        const newErr = { ...errors };
        newErr[event.target.name] = "";
        seterror(newErr);
        if (event.target.name === "password1") {
            setpassword1(event.target.value);
        } if (event.target.name === "password2") {
            setpassword2(event.target.value);
        }
    }
    const setToNull=()=>{
        setpassword1("");
        setpassword2("");
      }
    
    const onSubmitClickHandler = (event) => {
        event.preventDefault();
        if (isEmpty(password1) || isEmpty(password2)) {
            // console.log("field is empty");
            var data={
                "msg":"one or more field is empty"
            };
            setresponseData(data);
            setshowAlert(true);
            // setseverity(false);

        }
        else if (validatePassword(password1, password2, errors, seterror)) {
            // console.log("validaton true")
            const payload = {
                "row": props.row,
                "password": password1
            };
            axios.post("/manualupdate/user/edit/password", payload, header).then((response) => {
                if (response.data.success) {
                    setresponseData(response.data);
                    setToNull();
                    setshowAlert(true);
                } else {
                    var data={
                        "msg":response.data.msg
        
                    };
                    setresponseData(data);
                    setshowAlert(true);
                }
            }).catch((e) => {
                // console.log("error is:",e);
                var data={
                    "msg": e.message    
                };
                setresponseData(data);
                setshowAlert(true);
                if(e.message==='Request failed with status code 401'){
                    // console.log("logout called");
                    logout();
                  } 
            }).finally(() => {
                closeModal();
              });
        }
        else {
            // seterror(true);
            console.log("one of the field is invalid");
            setshowAlert(true);

        }

    }


    return (
        <div style={customStyles}>
            <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={responseData.msg} severity={responseData.success} />
            <Button variant={props.variant} onClick={openModal}>{props.name}</Button>
            <Modal show={modalIsOpen}
                style={customStyles} >
                <Modal.Header style={{ display: 'flex', justifyContent: "sapace-between" }}>
                    <p><b>User:</b> <b>{props.row.username}</b></p>
                    <Button variant="success" onClick={closeModal}>close</Button>
                </Modal.Header>
               
                <form className={classes.form} noValidate>
                <div style={{display:"flex",flexDirection:"column",margin:"5px 30px"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        autoFocus
                        onChange={onchangeHandler}
                        value={password1}
                    />
                    {errors["password1"] ? (<div style={guideStyle}>{errors["password1"]}</div>) : null}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        /* fullWidth */
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        onChange={onchangeHandler}
                        value={password2}
                    />
                    {errors["password2"] ? (<div style={guideStyle}>{errors["password2"]}</div>) : null}
                    </div>
                </form>


                <Modal.Footer>
                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        {/* <button disabled={submitting || response} onClick={onModalSubmit}>{!(submitting || response) ? "commit" : submitting ? "Submitting..." : "Updated"}</button> */}
                        <Button variant="warning" onClick={onSubmitClickHandler}>
                            {/* <Button variant="outlined" color="secondary" onClick={onSubmitClickHandler}></Button> */}
                            continue</Button>
                    </div>

                </Modal.Footer>
            </Modal>

        </div>
    )
}
const mapStateToProps = (state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    token: state.token
});
export default connect(mapStateToProps)(PasswordChangeModal);

