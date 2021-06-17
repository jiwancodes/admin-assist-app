import { React, useEffect, useState } from "react"
import SystemUsersTableWithPagenationAndSearch from '../table/SystemUsersTableWithPagenationAndSearch'
import { useHistory } from 'react-router-dom';
import axios from '../../axios-order'
import { getHeader } from '../../methods/actions'
import BackAppBar from "../../components/BackAppBar";


function ViewSystemUsers(props) {
    let history = useHistory()
    const header = getHeader();
    const [rows, setrows] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        history.push('/login');
    }
    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        axios.get(`/manualupdate/user`, header).then((response) => {
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            if (e.message === 'Request failed with status code 401') {
                console.log("logout called");
                logout();
            }
        });
        // eslint-disable-next-line
    }, [])

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllSystemUsers = () => {
        axios.get(`/manualupdate/user`, header).then((response) => {
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            if (e.message === 'Request failed with status code 401') {
                console.log("logout called");
                logout();
            }
        });
    }


    return (
        <div>
            <BackAppBar />
            <div style={{ backgroundColor: "#f0f0f0" }}><h3 style={{ margin: "auto", textAlign: "center" }}>System users </h3></div>
            <SystemUsersTableWithPagenationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                setPage={setPage}
                page={page}
                database={props.database}
                fetchAllSystemUsers={fetchAllSystemUsers}
            />

        </div>
    )
}

export default ViewSystemUsers