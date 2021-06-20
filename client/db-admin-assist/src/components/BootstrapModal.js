import React from 'react'
// import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import axios from '../axios-order';
import CustomizedSnackbars from './CustomizedSnackbars'
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import { getHeader } from '../methods/actions'
import { Fragment } from 'react';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function BootstrapModal(props) {
  let history = useHistory();
  const header = getHeader();
  const classes = useStyles();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [extensionOption, setextensionOption] = React.useState("");
  const [showAlert, setshowAlert] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [response, setresponse] = React.useState(false);
  const [responseData, setresponseData] = React.useState(false);
  const [paymentMethod, setpaymentMethod] = React.useState("");
  const [remarks, setRemarks] = React.useState("");




  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setresponse(false);
    setSubmitting(false);
    setIsOpen(false);
    props.fetchAllDataByOption(props.database);
  }
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    history.push('/login');
  }

  const onExtensionOptionChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value==="fiveDays"){
      setpaymentMethod("");
    }
    setextensionOption(event.target.value);
  }

  const onPaymentOptionChangeHandler = (event) => {
    event.preventDefault();
    setpaymentMethod(event.target.value);
  }
  
  const onRemarksChangeHandler = (event) => {
    event.preventDefault();
    setRemarks(event.target.value);
  }


  const onModalSubmit = () => {
    setSubmitting(true);
    if(extensionOption===""){
      let data={
        "msg":"please choose a package",
        "success":false
      };
      setresponseData(data);
      setshowAlert(true);
      setSubmitting(false);
      return 
    }else if((extensionOption!=="fiveDays"&&paymentMethod==="")){
      let data={
        "msg":"please choose a Payment Method",
        "success":false
      };
      setresponseData(data);
      setshowAlert(true);
      setSubmitting(false);
      return 
    }else if((extensionOption==="fiveDays"&&remarks==="")){
      let data={
        "msg":"please provide reason for awarding 5 days extension for record",
        "success":false
      };
      setresponseData(data);
      setshowAlert(true);
      setSubmitting(false);
      return 
    }
    const payload = {
      "option": extensionOption,
      "database": props.database,
      "row": props.row,
      "paymentmethod": paymentMethod,
      "remarks": remarks
    };
    // console.log(payload);
    axios.post(`/user/expdate/add`, payload, header).then((response) => {
      // console.log(response.data);
      setresponse(response.data.success);
      setresponseData(response.data);
      setshowAlert(true);
    }).catch((e) => {
      let data = {
        "msg": e.message
      }
      setresponseData(data);
      setshowAlert(true);
      if (e.message === 'Request failed with status code 401') {
        // console.log("logout called");
        logout();
      }
    }).finally(() => {
      setSubmitting(false);
      closeModal();
    });
  }



  return (
    <div style={customStyles}>
      <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={responseData.msg} severity={responseData.success} style={{width:"200px"}}/>
      <Button variant={props.variant} onClick={openModal}>{props.name}</Button>
      <Modal show={modalIsOpen}
        style={customStyles} >
        <Modal.Header style={{ display: 'flex', justifyContent: "sapace-between" }}>
          <p><b>Client :</b> <b>{props.row.username}</b></p>
          {/* <button onClick={closeModal}>close</button> */}
          <Button variant="success" onClick={closeModal}>close</Button>
        </Modal.Header>
        <Modal.Body>
          <h2 style={{ margin: 1, padding: 2, color: "red" }}>Warning!!</h2>
          <h4 style={{ margin: 1, padding: 2, color: "f00000" }}>This will alter the database. So be sure before commiting to change.</h4>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border:"1px solid " ,margin:"10px 20% 0px 20%",padding:"5px"}}>
            <Fragment>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-autowidth-label">Package</InputLabel>
                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth"
                  value={extensionOption} onChange={onExtensionOptionChangeHandler} autoWidth
                >
                  <MenuItem value="" disabled>Choose </MenuItem>
                  <MenuItem value="fiveDays">5 days</MenuItem>
                  {props.database === 'npstock' ? <MenuItem value="threeMonths">3 months</MenuItem> : null}
                  <MenuItem value="oneYear">1 year</MenuItem>
                  <MenuItem value="lifeTime">life time</MenuItem>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Fragment>
              {extensionOption !== "fiveDays" ?
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-autowidth-label">Payment Via</InputLabel>
              <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth"
                value={paymentMethod} onChange={onPaymentOptionChangeHandler} autoWidth
                >
                  <MenuItem value="" disabled>Choose </MenuItem>
                  <MenuItem value="Connectips">ConnectIps</MenuItem>
                  <MenuItem value="Bank Deposit">Bank Deposit</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>:
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-autowidth-label">Payment Via</InputLabel>
              <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth"
                value={paymentMethod} onChange={onPaymentOptionChangeHandler} autoWidth                >
                  <MenuItem value="" disabled>Choose </MenuItem>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
            
            }

            <TextField
              id="outlined-multiline-static"
              label="Remarks"
              multiline
              rows={4}
              placeholder="Remarks"
              onChange={onRemarksChangeHandler}
              variant="outlined"
            />


          </div>
        </Modal.Body>
        <Modal.Footer> <Button variant="warning" disabled={submitting || response} onClick={onModalSubmit}>{!(submitting || response) ? "commit" : submitting ? "Submitting..." : "Updated"}</Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default BootstrapModal