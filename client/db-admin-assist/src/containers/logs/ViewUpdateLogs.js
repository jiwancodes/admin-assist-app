import { React, useEffect, useState } from "react"
import UpdateLogTableWithPaginationAndSearch from '../table/UpdateLogTableWithPaginationAndSearch'
import axios from '../../axios-order'
// import MaterialAppBar from "../../components/MaterialAppBar";

function ViewUpdateLogs(props) {
    const [rows, setrows] = useState("");
    // const [database, setdatabase] = useState(props.database);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    console.log("from props:",props.database);
    // const headings = ["SN", "Extension Date", "Username", "Extended Period", "Payment Method","Updator"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        console.log("from use effect");
        let payload = {"option": props.database};
        axios.post(`/updatelogs`, payload).then((response) => {
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        })

    }, [props.database]);

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllDataByOption = (option) => {
        console.log("from onchange");
        console.log("fetche data called");
        let payload = { "option": option};
        axios.post(`/updatelogs`, payload).then((response) => {
            // console.log("here are rows");
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        })
    }

    return (
        <div>
            {/* <MaterialAppBar/> */}
            <div style={{backgroundColor:"#f0f0f0"}}><h3 style={{margin:"auto", textAlign: "center"}}>Update log of {props.database} users</h3></div>

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
