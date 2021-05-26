import { React, useState, useEffect } from 'react'
import SearchBar from 'material-ui-search-bar'
import BasicTable from './components/Table'
import axios from 'axios'

function Home() {
  const [showTable, setshowTable] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const [userDetails, setuserDetails] = useState("");
  const [chooseDatabase, setchooseDatabase] = useState("npstock");
  useEffect(() => {
    axios.get("http://localhost:5000/user/details/npstock").then((response) => {
      console.log("here is response message",response.data.msg);
      // console.log(response.data.rows);
      var tempData = JSON.parse(response.data.rows);
      setuserDetails(tempData);
      // console.log(userDetails);
      setshowTable(true);
    })

  }, [])

  const fetchAllDataByOption = (option) => {
    console.log("fetche data called");
    axios.get(`http://localhost:5000/user/details/${option}`).then((response) => {
      // console.log("here are rows");
      // console.log(response.data.rows);
      var tempData = JSON.parse(response.data.rows);
      setuserDetails(tempData);
      setshowTable(true);
    })
  }

  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    event.preventDefault();
    setchooseDatabase(event.target.value);
    fetchAllDataByOption(event.target.value);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = userDetails.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase()) || row.phone.includes(searchedVal);
    });
    setuserDetails(filteredRows);
  };

  const cancelSearch = () => {
    setsearchValue("");
    fetchAllDataByOption(chooseDatabase);
  }

  const renderTable = () => {
    if (showTable) {
      return <BasicTable rows={userDetails} database={chooseDatabase} fetchAllDataByOption={fetchAllDataByOption}/>
    }
  }

  return (
    <div className="App">
      <div className="searchBarWrapper" style={{
        width: "80%", minWidth: 500, margin: "10px auto", position: "fixed",
        top: 0, left: "10%", display: "flex", justifyContent: "space-around"
      }}>
        <SearchBar
          value={searchValue}
          onChange={(val) => {
            setsearchValue(val)
            /* requestSearch(searchValue) */
          }}
          onRequestSearch={() => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
          style={{ width: 500 }}
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

export default Home
