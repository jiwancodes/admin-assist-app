import { React, useState, useEffect } from 'react'
import SearchBar from 'material-ui-search-bar'
import BasicTable from './components/Table'
import axios from 'axios'

function App() {
  const [showTable, setshowTable] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  // const [rows, setRows] = useState<food[]>(originalRows);
  const [userDetails, setuserDetails] = useState("");
  const [chooseDatabase, setchooseDatabase] = useState("npstock")
  useEffect(() => {
    axios.get("http://localhost:5000/user/details/npstock").then((response) => {
      console.log("here are rows");
      console.log(response.data.msg);
      console.log(response.data.rows);
      var tempData = JSON.parse(response.data.rows);
      setuserDetails(tempData);
      console.log(userDetails);
      setshowTable(true);
    })

  }, [])

  const fetchAllDataByOption = (option) => {
    axios.get(`http://localhost:5000/user/details/${option}`).then((response) => {
      console.log("here are rows");
      console.log(response.data.msg);
      console.log(response.data.rows);
      var tempData = JSON.parse(response.data.rows);
      setuserDetails(tempData);
      console.log(userDetails);
      setshowTable(true);
    })
  }

  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    event.preventDefault();
    console.log(event.target.value);
    setchooseDatabase(event.target.value);
    fetchAllDataByOption(event.target.value);

  }
  // const searchHandler = () => {
  //   console.log("enter pressed");
  //     axios.post("http://localhost:5000/user/search", { "database": chooseDatabase, "value": searchValue }).then((response) => {
  //       console.log("here are rows");
  //       console.log(response.data.msg);
  //       console.log(response.data.rows);
  //       var tempData = JSON.parse(response.data.rows);
  //       setuserDetails(tempData);
  //       console.log(userDetails);
  //       setshowTable(true);
  //     })
  // }
  const requestSearch = (searchedVal) => {
    const filteredRows = userDetails.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
  setuserDetails(filteredRows);
};

const cancelSearch = () => {
  setsearchValue("");
  requestSearch(searchValue);
};
  
  const renderTable = () => {
    if (showTable) {
      return <BasicTable rows={userDetails} />
    }
  }


  return (
    <div className="App">
      <div className="searchBarWrapper" style={{
        width: "80%", margin: "10px auto", position: "fixed",
        top: 0, left: "10%", display: "inline"
      }}>
        <SearchBar
          value={searchValue}
          onChange={(searchValue) => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
        <select value={chooseDatabase} onChange={onOptionChangeHandler}>
          <option name="npstocks" value="npstock">npstock</option>
          <option name="systemxlite" value="systemxlite">systemxlite</option>
        </select>
      </div>
      <div className="tableWrapper" style={{ margin: "60px 10px 10px 10px", }}>
        {renderTable()}

      </div>

    </div>
  )
}

export default App
