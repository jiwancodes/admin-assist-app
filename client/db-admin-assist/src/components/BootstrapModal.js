import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from '../axios-order';
import CustomizedSnackbars from './CustomizedSnackbars'

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


function BootstrapModal(props) {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [extensionOption, setextensionOption] = React.useState("fiveDays");
  const [showAlert, setshowAlert] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [response, setresponse] = React.useState(false);
  const [responseData, setresponseData] = React.useState(false);




  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setresponse(false);
    setIsOpen(false);
    props.fetchAllDataByOption(props.database);
  }


  const onExtensionOptionChangeHandler = (event) => {
    // console.log("onExtensionChangeHandler called");
    // console.log(event.target.value);
    setextensionOption(event.target.value);
  }

  const onModalSubmit = () => {
    setSubmitting(true);
    const payload = {
      "option": extensionOption,
      "database": props.database,
      "row": props.row,
    };
    axios.post(`/user/expdate/add`, payload).then((response) => {
      console.log(response.data.success);
      setresponse(response.data.success);
      setresponseData(response.data);
      setshowAlert(true);
    }).catch((e) => {
      setshowAlert(true);
      console.log(e)
    }).finally(() => {
      console.log(showAlert);
      setSubmitting(false);
      closeModal();
    });
  }

  return (
    <div style={customStyles}>
      <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={responseData.msg} severity={responseData.success}/>
      <Button onClick={openModal}>Extend Expiry Date</Button>
      <Modal show={modalIsOpen}
        style={customStyles} >
        <Modal.Header style={{ display: 'flex', justifyContent: "sapace-between" }}>
          <p><b>User Name :</b> <b>{props.row.username}</b></p>
          <button onClick={closeModal}>close</button>
        </Modal.Header>
        <Modal.Body>
          <h2 style={{ margin: 1, padding: 2, color: "red" }}>Warning!!</h2>
          <h4 style={{ margin: 1, padding: 2, color: "f00000" }}>This may alter the database. So be sure before commiting to change.</h4>
          <div style={{ margin: 5, padding: 2, display: 'flex', justifyContent: "flex-end" }}>Extend expiry date of user by:
                         <select value={extensionOption} onChange={onExtensionOptionChangeHandler}>
              <option value="fiveDays">5 days</option>
              <option value="oneYear">1 year</option>
              <option value="lifeTime">life time</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: "flex-end" }}><button disabled={submitting || response} onClick={onModalSubmit}>{!(submitting || response) ? "commit" : submitting ? "Submitting..." : "Updated"}</button></div>

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default BootstrapModal
