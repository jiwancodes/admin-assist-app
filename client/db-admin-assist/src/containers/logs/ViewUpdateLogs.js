import { React, useEffect, useState } from "react"
import { connect } from 'react-redux';
import UpdateLogTableWithPaginationAndSearch from '../table/UpdateLogTableWithPaginationAndSearch'
import axios from '../../axios-order'
import MaterialAppBar from '../../components/MaterialAppBar'
function ViewUpdateLogs(props) {
    const [showTable, setshowTable] = useState(false);
    const [rows, setrows] = useState("");
    const [database, setdatabase] = useState(props.database);
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
    const fetchAllUpdateLogsByDatabase = (database) => {
        console.log("fetche data called");
        let payload={
            "option":database
        };
        axios.post(`/updatelogs`,payload).then((response) => {
          console.log("called update logs");
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        })
        console.log(rows);
    }

    return (
        <div>
            <MaterialAppBar
                database={database}
                setdatabase={setdatabase}
                fetchAllDataByOption={fetchAllUpdateLogsByDatabase}
            />

            <UpdateLogTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                setPage={setPage}
                page={page} database={database}
                fetchAllDataByOption={fetchAllUpdateLogsByDatabase}
                setshowTable={setshowTable}
                showTable={showTable}
            />
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    // isAuthenticated: state.isAuthenticated,
    // // user: state.user,
    database:state.database,
  
  });
  const mapDispatchToProps = (dispatch) => {
    return {
      storeUser: (user) => {
        console.log("user in dispatch", user);
        dispatch({ "type": 'SET_USER', "payload": user })
      },
      storetoken: (token) => { dispatch({ "type": 'SET_TOKEN', "payload": token }) },
      storedatabase: (database) => { dispatch({ "type": 'SET_DATABASE', "payload": database }) },
  
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ViewUpdateLogs);

// export default ViewUpdateLogs
