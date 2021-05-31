import {React,useState} from 'react'
import SearchBar from 'material-ui-search-bar'

function MaterialSearchBar(props) {
  const [searchValue, setsearchValue] = useState("");
  const{userDetails,setuserDetails,database,fetchAllDataByOption,setshowTable}=props;

  //table search based on username and phone number
  const requestSearch = (searchedVal) => {
    const filteredRows = userDetails.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase()) || row.phone.includes(searchedVal);
    });
    setuserDetails(filteredRows);
  };

  //handles search cancelation
  const cancelSearch = () => {
    setsearchValue("");
    setuserDetails("")    
    setshowTable(false);
    fetchAllDataByOption(database);
  }
  return (
    <SearchBar
    value={searchValue}
    onChange={(val) => {
      setsearchValue(val)
      /* requestSearch(searchValue) */
    }}
    onRequestSearch={() => requestSearch(searchValue)}
    onCancelSearch={() => cancelSearch()}
    style={{ width: 300 }}
  />
  )
}

export default MaterialSearchBar
