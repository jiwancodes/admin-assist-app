import { React, useEffect, useState } from "react"
import MaterialAppBar from '../../components/MaterialAppBar'
import UpdateLogTableWithPaginationAndSearch from '../table/UpdateLogTableWithPaginationAndSearch'
import axios from '../../axios-order'

function ViewUpdateLogs() {
    const [showTable, setshowTable] = useState(false);
    const [rows, setrows] = useState("");
    const [database, setdatabase] = useState("npstock");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const headings = ["SN", "Extension Date", "Username", "Extended Period", "Payment Method","Updator"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        console.log("use effect called");
        let payload={
            "option":"npstock"
        };
        axios.post(`/updatelogs`,payload).then((response) => {
            console.log("here is response message", response.data.msg);
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
            // console.log(rows);
            setshowTable(true);
        })

    }, [])

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllDataByOption = (option) => {
        console.log("fetche data called");
        let payload={
            "option":option
        };
        axios.post(`/updatelogs`,payload).then((response) => {
            // console.log("here are rows");
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
            setshowTable(true);
        })
    }

    return (
        <div>
            <MaterialAppBar
                database={database}
                setdatabase={setdatabase}
                fetchAllDataByOption={fetchAllDataByOption}
            />

            <UpdateLogTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                setPage={setPage}
                page={page} database={database}
                fetchAllDataByOption={fetchAllDataByOption}
                setshowTable={setshowTable}
                showTable={showTable}
            />
            
        </div>
    )
}

export default ViewUpdateLogs
