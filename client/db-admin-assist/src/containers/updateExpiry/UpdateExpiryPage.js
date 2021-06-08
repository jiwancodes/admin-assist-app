import { React, useEffect, useState } from "react"
import { connect } from 'react-redux';
import MaterialAppBar from '../../components/MaterialAppBar'
import UserDetailsTableWithPaginationAndSearch from '../table/UserDetailsTableWithPaginationAndSearch'
import axios from '../../axios-order'

function UpdateExpiryPage(props) {
    const [showTable, setshowTable] = useState(false);
    const [rows, setrows] = useState("");
    const [database, setdatabase] = useState(props.database);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headings = ["SN", "Username", "Phone", "Expiry Date", "Update Expiry Date"];

    //fetches data for npstock users just once after initial render  
    useEffect(() => {
        axios.get(`/user/details/${props.database}`).then((response) => {
            console.log("here is response message", response.data.msg);
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
            // console.log(rows);
            setshowTable(true);
        })

    }, [])

    //switches tables based on option for fetching users of npstock and systemxlite
    const fetchAllUserDataByDatabase = (database) => {
        console.log("fetche data called");
        axios.get(`/user/details/${database}`).then((response) => {
            // console.log("here are rows");
            // console.log(response.data.rows);
            var tempData = JSON.parse(response.data.rows);
            setrows(tempData);
        })
    }


    return (
        <div>
            <MaterialAppBar
                database={props.database}
                setdatabase={setdatabase}
                fetchAllDataByOption={fetchAllUserDataByDatabase}
            />

            <UserDetailsTableWithPaginationAndSearch
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}
                setrows={setrows}
                headings={headings} setPage={setPage}
                page={page} 
                database={props.database}
                fetchAllDataByOption={fetchAllUserDataByDatabase}
                setshowTable={setshowTable}
                showTable={showTable}
            />

        </div>
    )
}

// export default UpdateExpiryPage
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
  export default connect(mapStateToProps, mapDispatchToProps)(UpdateExpiryPage);
