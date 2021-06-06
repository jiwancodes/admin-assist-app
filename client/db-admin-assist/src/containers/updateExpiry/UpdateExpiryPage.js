import { React, useEffect, useState } from "react"
import MaterialAppBar from '../../components/MaterialAppBar'
import UserDetailsTableWithPaginationAndSearch from '../table/UserDetailsTableWithPaginationAndSearch'
import axios from '../../axios-order'

function UpdateExpiryPage(props) {
    const [showTable, setshowTable] = useState(false);
    // const [searchValue, setsearchValue] = useState("");
    const [rows, setrows] = useState("");
    const [database, setdatabase] = useState("npstock");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headings = ["SN", "Username", "Phone", "Expiry Date", "Update Expiry Date"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        axios.get(`/user/details/${database}`).then((response) => {
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
        axios.get(`/user/details/${option}`).then((response) => {
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

            <UserDetailsTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                headings={headings} setPage={setPage}
                page={page} database={database}
                fetchAllDataByOption={fetchAllDataByOption}
                setshowTable={setshowTable}
                showTable={showTable}
            />

        </div>
    )
}

export default UpdateExpiryPage
