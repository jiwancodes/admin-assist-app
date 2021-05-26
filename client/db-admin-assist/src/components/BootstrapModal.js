import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import Alert from './Alert';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
  };


function BootstrapModal(props) {

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [extensionOption,setextensionOption] = React.useState("fiveDays");
    const [showAlert, setshowAlert] = React.useState(false);
    const [response, setresponse] = React.useState("");



 const openModal=() =>{
    setIsOpen(true);
  }
  const closeModal=()=>{
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
          setresponse(response.data);
          setshowAlert(true);
    
        }).catch((e)=>{
          console.log(e)
          setshowAlert(true);
        });
    
      }
      const renderAlert = () => {
        if (showAlert) {
          return <Alert success={response.success} msg={response.msg} onModalSubmit={onModalSubmit}/>
        }
      }
  
    return (
        <div style={customStyles}>
            <Button onClick={openModal}>Extend Expiry Date</Button>
            <Modal show={modalIsOpen}
          onRequestClose={closeModal} 
           style={customStyles} >
                <Modal.Header  style={{ display: 'flex', justifyContent: "flex-end" }}>
                <button onClick={closeModal}>close</button>
                </Modal.Header>
                <Modal.Body>
                        <h2 style={{ margin: 1, padding: 2 ,color: "red"}}>Alert</h2>
                        <h4 style={{ margin: 1, padding: 2,color: "red" }}>This may alter the database. So be sure before commiting to change.</h4>
                    <div style={{ margin: 5, padding: 2 }}>Extend expiry date of user <b>{props.row.username}</b> by:
                         <select value={extensionOption} onChange={onExtensionOptionChangeHandler}>
                            <option value="fiveDays">5 days</option>
                            <option value="oneYear">1 year</option>
                            <option value="lifeTime">life time</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <div style={{display:'flex',justifyContent:"flex-end"}}><button  onClick={onModalSubmit}>Commit</button></div>

                </Modal.Footer>
                {renderAlert}

            </Modal>

        </div>
    )
}

export default BootstrapModal
