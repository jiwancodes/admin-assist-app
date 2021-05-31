import { React, useState, useEffect } from 'react'
import MaterialSearchBar from '../../components/MaterialSearchBar'
import MaterialTable from '../../components/MaterialTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'
import axios from '../../axios-order'
import './CombinedTable.css'

function CombinedTable() {
  const [showTable, setshowTable] = useState(false);
  // const [searchValue, setsearchValue] = useState("");
  const [userDetails, setuserDetails] = useState("");
  const [chooseDatabase, setchooseDatabase] = useState("npstock");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <div className="container">
      <div className="header"><select value={chooseDatabase} onChange={onOptionChangeHandler}>
        <option name="npstocks" value="npstock">npstock</option>
        <option name="systemxlite" value="systemxlite">systemxlite</option>
      </select></div>
      {/* handles optional rendering of table i.e renders table only if data is present */}
      {showTable ?
        <div>
          <div className="searchBarWrapper" >
            <MaterialTablePagination rows={userDetails} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
            <MaterialSearchBar userDetails={userDetails} setuserDetails={setuserDetails} database={chooseDatabase} fetchAllDataByOption={fetchAllDataByOption} setshowTable={setshowTable}/>
          </div>
          <div className="tableWrapper">
            <MaterialTable rowsPerPage={rowsPerPage} page={page} rows={userDetails} database={chooseDatabase} fetchAllDataByOption={fetchAllDataByOption} />
          </div>
        </div> : <div></div>}
    </div>
  )
}

export default CombinedTable
