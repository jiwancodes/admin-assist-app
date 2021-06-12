import { React, useEffect, useState } from "react"
import UpdateLogTableWithPaginationAndSearch from '../table/UpdateLogTableWithPaginationAndSearch'
import MaterialAppBar from '../../components/MaterialAppBar';
import axios from '../../axios-order'
import {getHeader,logUserOut} from '../../methods/actions'
import { useHistory } from "react-router-dom";

function ViewUpdateLogs(props) {
    let history= useHistory()
    const header=getHeader();
    const [rows, setrows] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const headings = ["SN", "Extension Date", "Username", "Extended Period", "Payment Method","Updator"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        let payload = { "option": props.database };
        axios.post(`/getupdatelogs`,payload,header).then((response) => {
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        }).catch((e) => {
            console.log(JSON.stringify(e));  
            if(e.name==='TokenExpiredError'){
                console.log("logout called");
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                console.log(localStorage.getItem('jwtToken'));
                // history.push('/login');
                logUserOut();
              }  
            // logUserOut() ;  
          });
// eslint-disable-next-line
    }, [props.database]);

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllDataByOption = (option) => {
        console.log("from onchange");
        console.log("fetche data called");
        let payload = { "option": option };
        axios.post(`/updatelogs`,payload,header).then((response) => {
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
            <div style={{ backgroundColor: "#f0f0f0" }}><h3 style={{ margin: "auto", textAlign: "center" }}>Update log of {props.database} users</h3></div>

            <UpdateLogTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                setPage={setPage}
                page={page}
                database={props.database}
                fetchAllDataByOption={fetchAllDataByOption}
            />

        </div>
    )
}
export default ViewUpdateLogs
