import React from 'react';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';




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
    const { toggleDrawer, state } = props
    let user = localStorage.getItem('user');

    const logout = (event) => {
        event.preventDefault();
        console.log("logout called");
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        console.log(localStorage.getItem('jwtToken'));
        history.push('/login');
    }


    return (
        <div>
            {(['left']).map((anchor) => (
                <React.Fragment key={anchor}>
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
