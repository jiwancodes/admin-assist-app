import React from 'react';
import Modal from 'react-modal';
import axios from 'axios'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export default function ModalBootstrap(props){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [extensionOption,setextensionOption] = React.useState("fiveDays");
  // const [dataRow,setDataRow] = React.useState(props.row);
  // const [date,setDate] = React.useState(props.row.expiry_date);

  function openModal() {
    console.log("here is row in modal");
    console.log(props.row.idlogin);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }
  const onExtensionOptionChangeHandler=(event)=>{
    console.log("onExtensionChangeHandler called");
    console.log("from event")
    console.log(event.target.value);
    setextensionOption(event.target.value);
  }


  const onModalSubmit=()=>{
    const payload={
      "option":extensionOption,
      "database":props.database,
      "row":props.row,
    };
    axios.post('http://localhost:5000/user/expdate/add',payload).then((response)=>{
      console.log(response.data);

    }).catch((e)=>{
      console.log(e)
    });

  }


    return (
      <div>
        <button  variant="outlined" color="primary" onClick={openModal}>Extend Expiry Date</button>
        <Modal
          isOpen={modalIsOpen}
           onAfterOpen={afterOpenModal} 
          onRequestClose={closeModal} 
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{display:'flex',justifyContent:"flex-end"}}><button onClick={closeModal}>close</button></div>
        <div style={{margin:5, padding:2,color:"red"}}> 
        <h2 ref={_subtitle => (subtitle = _subtitle)} style={{margin:1, padding:2}}>Alert</h2>
          <h4 ref={_subtitle => (subtitle = _subtitle)}>This may alter the database. So be sure before commiting to change.</h4>
         </div>
         <form>
          <div style={{margin:5, padding:2}}>Extend expiry date of user <b>{props.row.username}</b> by:
          <select value={extensionOption} onChange={onExtensionOptionChangeHandler}>
            <option value="fiveDays">5 days</option>
            <option value="oneYear">1 year</option>
            <option value="lifeTime">life time</option>
          </select></div>
          <div style={{display:'flex',justifyContent:"flex-end"}}><button  onClick={onModalSubmit}>Commit</button></div>
          </form>

          
        </Modal>
      </div>
    );
}


