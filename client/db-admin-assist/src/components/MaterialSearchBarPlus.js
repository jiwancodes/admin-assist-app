import {React} from 'react'
import SearchBar from 'material-ui-search-bar'

function MaterialSearchBarPlus(props) {
  const{searchValue,setsearchValue,}=props;

  //handles search cancelation
  const cancelSearch = () => {
    setsearchValue("");
  }
  return (
    <SearchBar
    value={searchValue}
    onChange={(val) => {setsearchValue(val)}}
    /* onRequestSearch={() => requestSearch(searchValue)} */
    onCancelSearch={() => cancelSearch()}
    style={{ width: 300 }}
  />
  )
}
export default MaterialSearchBarPlus;

