import React, { useState ,Fragment} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbars';
import axios from '../axios-order'
import {getHeader} from '../methods/actions'




const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});



export default function MaterialSideDrawer(props) {
    const classes = useStyles();
    const history = useHistory();
    const header = getHeader();
    const [showAlert, setshowAlert] = useState(false);
    const [alertMsg, setalertMsg] = useState("");
    const { toggleDrawer, state } = props
    let user = localStorage.getItem('user');

    const logout = (event) => {
        event.preventDefault();
        // console.log("logout called");
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        // console.log(localStorage.getItem('jwtToken'));
        history.push('/login');
    }
    const addUser = (event) => {
        if (user === 'admin') {
            history.push('/signup')
        }
        else {
            setalertMsg("Only admin can add users")
            setshowAlert(true);
        }

    }
    const viewManualUpdateUsers=()=>{
        axios.get('/manualupdate/user',header)
        .then(()=>{})
        .catch((e)=>{
            console.log(e);
        })

    }


    return (
        <div>
            {(['left']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <CustomizedSnackbars open={showAlert} setOpen={setshowAlert} msg={alertMsg} severity={false} />

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div
                            className={clsx(classes.list, { [classes.fullList]: anchor === 'top' || anchor === 'bottom', })}
                            role="presentation"
                            onClick={toggleDrawer(anchor, false)}
                            onKeyDown={toggleDrawer(anchor, false)}
                        >
                            <List>
                                {[user].map((text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemIcon>{index % 2 === 0 ? <AccountCircleIcon /> : <MailIcon />}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                <ListItem onClick={logout}>
                                    <ListItemIcon > <ExitToAppIcon /> </ListItemIcon>
                                    <ListItemText primary="logout" />
                                </ListItem>    
                                { user==="admin"?    
                                <Fragment>                
                                <ListItem onClick={addUser}>
                                    <ListItemIcon > <AddCircleOutlineIcon /> </ListItemIcon>
                                    <ListItemText primary="Add User" />
                                </ListItem>
                                <ListItem onClick={viewManualUpdateUsers}>
                                    <ListItemIcon > <VisibilityIcon /> </ListItemIcon>
                                    <ListItemText primary="View System Users" />
                                </ListItem>
                                </Fragment> :null}
                                {/* <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}> */}
                                {/* </div> */}
                            </List>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
