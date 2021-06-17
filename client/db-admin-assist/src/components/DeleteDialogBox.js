import React from 'react';
// import { Button } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomizedSnackbars from './CustomizedSnackbars'
import { useHistory } from 'react-router-dom';
import axios from '../axios-order';
import {getHeader} from '../methods/actions'

export default function DeleteDialogBox(props) {
  const [open, setOpen] = React.useState(false);
  const [responseData, setresponseData] = React.useState(false);
  const [showAlert, setshowAlert] = React.useState(false);
  const [disable, setdisable] = React.useState(false);
  const {fetchAllSystemUsers}=props


  let header= getHeader();
  let history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setdisable(false);
    setOpen(false);
    fetchAllSystemUsers();
  };
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    history.push('/login');
}

  const handleConfirm =()=>{
    setdisable(true)
      let payload={
          "row":props.row
      };
      axios.post(`/manualupdate/user/delete`,payload,header).then((response) => {
        setresponseData(response.data);
        setshowAlert(true);      
      }).catch((e) => {
        if(e.message==='Request failed with status code 401'){
          // console.log("logout called");
          logout();
        } 
        let data={
          "msg":e.message
        }
        setresponseData(data);
        setshowAlert(true);
      }).finally(() => {
        setTimeout(function() {
          handleClose();
        }, 1000);
      });
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete User
      </Button>
      <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={responseData.msg} severity={responseData.success} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div style={{font:"#aa5555"}}>
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete<b> {props.row.username}</b>?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              The user will no longer have access to this system if you confirm. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  variant="outlined" color="primary" >
            Cancel
          </Button> 
          <Button disabled={disable} onClick={handleConfirm} variant="outlined" color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
