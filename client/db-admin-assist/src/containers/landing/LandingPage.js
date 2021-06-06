import { React, useState, useEffect } from 'react'
import MaterialAppBar from '../../components/appbar/MaterialAppBar'
// import CombinedTable from '../table/CombinedTable';
import TableWithPaginationAndSearch from '../table/TableWithPaginationAndSearch'
import axios from '../../axios-order'

// import Table from '../../components/Table'



function LandingPage() {
    const [showTable, setshowTable] = useState(false);
  // const [searchValue, setsearchValue] = useState("");
  const [userDetails, setuserDetails] = useState("");
  const [chooseDatabase, setchooseDatabase] = useState("npstock");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headings=["SN","Username","Phone","Expiry Date","Update Expiry Date"];

  //fetches data for npstock users just once after initial render  
  useEffect(() => {
    axios.get(`/user/details/npstock`).then((response) => {
      console.log("here is response message", response.data.msg);
      // console.log(response.data.rows);
      var tempData = JSON.parse(response.data.rows);
      setuserDetails(tempData);
      // console.log(userDetails);
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
      setuserDetails(tempData);
      setshowTable(true);
    })
  }

  //handles option switch between npstocks and systemxlite
  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    event.preventDefault();
    setchooseDatabase(event.target.value);
    fetchAllDataByOption(event.target.value);
  }
    return (
        <div>
            <MaterialAppBar />
            {/* <Table/> */}
            {/* <CombinedTable/> */}
            <TableWithPaginationAndSearch
            rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} userDetails={userDetails} setuserDetails={setuserDetails} headings={headings} setPage={setPage} page={page} database={chooseDatabase} fetchAllDataByOption={fetchAllDataByOption} setshowTable={setshowTable} showTable={showTable}/>
        </div>
    )
}

export default LandingPage
