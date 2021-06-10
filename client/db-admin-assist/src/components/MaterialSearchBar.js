import {React,useState} from 'react'
import SearchBar from 'material-ui-search-bar'
// import { connect } from 'react-redux';

function MaterialSearchBar(props) {
  const [searchValue, setsearchValue] = useState("");
  const{rows,setrows,database,fetchAllDataByOption}=props;

  //table search based on username and phone number
  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      // return row.username.toLowerCase().includes(searchedVal.toLowerCase()) || row.phone.includes(searchedVal);
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setrows(filteredRows);
  };

  //handles search cancelation
  const cancelSearch = () => {
    setsearchValue("");
    setrows("");   
    // props.storeDatabase(database);
    fetchAllDataByOption(database);
  }
  return (
    <SearchBar
    value={searchValue}
    onChange={(val) => {
      setsearchValue(val)
      /* requestSearch(searchValue)  */
    }}
    onRequestSearch={() => requestSearch(searchValue)}
    onCancelSearch={() => cancelSearch()}
    style={{ width: 300 }}
  />
  )
}
export default MaterialSearchBar;
// const mapStateToProps = (state) => ({
//   database:state.database
// });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeDatabase: (database) => {dispatch({ "type": 'SET_DATABASE', "payload": database })}
//   }
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MaterialSearchBar);

