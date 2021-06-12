import { React, useEffect, useState } from "react"
import UserDetailsTableWithPaginationAndSearch from '../table/UserDetailsTableWithPaginationAndSearch'
import MaterialAppBar from '../../components/MaterialAppBar';
import { useHistory } from 'react-router-dom';
import axios from '../../axios-order'
import {getHeader,logUserOut} from '../../methods/actions'


function UpdateExpiryPage(props) {
    let history = useHistory()
    const header=getHeader();

    const [rows, setrows] = useState("");
    // const [database, setdatabase] = useState(props.database);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headings = ["SN", "Username", "Phone", "Expiry Date", "Update Expiry Date"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        // console.log("from use effect");
        // console.log(header)
        // console.log(props.database);
        axios.get(`/user/details/${props.database}`,header).then((response) => {
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            // console.log("status code is",e.name); 
            if(e.name==='TokenExpiredError'){
                console.log("logout called");
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                console.log(localStorage.getItem('jwtToken'));
                logUserOut();
              } 
            logUserOut() ;  
          });
// eslint-disable-next-line
    }, [props.database])

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllDataByOption = (option) => {
        // console.log("fetch data called");
        axios.get(`/user/details/${option}`,header).then((response) => {
            // console.log("here are rows");
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            // console.log("status code is",e.name); 
            if(e.name==='TokenExpiredError'){
                console.log("logout called");
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                console.log(localStorage.getItem('jwtToken'));
                history.push('/login');
                logUserOut();
              }  
            // logUserOut() ;  
          });
    }


    return (
        <div>
        <MaterialAppBar/>
            <div style={{backgroundColor:"#f0f0f0"}}><h3 style={{margin:"auto", textAlign: "center"}}>Details of {props.database} user </h3></div>       
             <UserDetailsTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                headings={headings}
                setPage={setPage}
                page={page}
                database={props.database}
                fetchAllDataByOption={fetchAllDataByOption} 
            />

        </div>
    )
}

export default UpdateExpiryPage