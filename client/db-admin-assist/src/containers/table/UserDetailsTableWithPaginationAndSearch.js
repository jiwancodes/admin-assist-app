import React,{useState} from 'react'
import MaterialSearchBarPlus from '../../components/MaterialSearchBarPlus'
import MaterialUserDetailTable from '../../components/MaterialUserDetailTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'
import './UserDetailsTableWithPaginationAndSearch.css'



function UserDetailsTableWithPaginationAndSearch(props) {
    const { rowsPerPage, setRowsPerPage, rows, setPage, page, database} = props;
    const [searchValue, setsearchValue] = useState("");
    // console.log(rows);

    const requestSearch = (rows) => {
        return rows.filter((row) => row.username.toLowerCase().includes(searchValue.toLowerCase()) || row.phone.includes(searchValue))
        // return rows.filter((row) => row.username.toLowerCase().indexOf(searchValue) || row.phone.indexOf(searchValue)>-1)
    };

    return (
        <div className="container">
            {rows!==""?
            <div>
                <div className="searchBarWrapper" >
                <MaterialTablePagination rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    <MaterialSearchBarPlus searchValue={searchValue} setsearchValue={setsearchValue} database={database}/>
                </div>
                <div className="tableWrapper" >
                    <MaterialUserDetailTable rowsPerPage={rowsPerPage} page={page} rows={requestSearch(rows)} database={database}/>
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default UserDetailsTableWithPaginationAndSearch
