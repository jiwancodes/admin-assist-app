import { React, useEffect, useState } from "react"
import UserDetailsTableWithPaginationAndSearch from '../table/UserDetailsTableWithPaginationAndSearch'
import MaterialAppBar from '../../components/MaterialAppBar';
import {logUserOut} from '../../methods/actions'
import axios from '../../authAxios'


function UpdateExpiryPage(props) {
    const [rows, setrows] = useState("");
    // const [database, setdatabase] = useState(props.database);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headings = ["SN", "Username", "Phone", "Expiry Date", "Update Expiry Date"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        axios.get(`/user/details/${props.database}`).then((response) => {
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            // console.log("status code is",e.name);  
            logUserOut() ;  
          });

    }, [props.database])

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllDataByOption = (option) => {
        console.log("fetche data called");
        axios.get(`/user/details/${option}`).then((response) => {
            // console.log("here are rows");
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));
            // console.log("status code is",e.name);  
            logUserOut() ;  
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