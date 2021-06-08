import { Fragment, React, useEffect, useState } from "react"
import { connect } from 'react-redux';
import UpdateLogTableWithPaginationAndSearch from '../table/UpdateLogTableWithPaginationAndSearch'
import axios from '../../axios-order'

function ViewUpdateLogs(props) {
    const [showTable, setshowTable] = useState(false);
    const [rows, setrows] = useState("");
    // const [database, setdatabase] = useState(props.database);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        console.log("use effect called");
        let payload={
            "option":props.database
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
        <Fragment>
            <UpdateLogTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                setPage={setPage}
                page={page} database={props.database}
                fetchAllDataByOption={fetchAllDataByOption}
                setshowTable={setshowTable}
                showTable={showTable}
            />            
            </Fragment>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    // // user: state.user,
    // database:state.database,
  
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
