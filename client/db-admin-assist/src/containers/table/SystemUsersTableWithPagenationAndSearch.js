import React,{useState} from 'react'
import MaterialSearchBarPlus from '../../components/MaterialSearchBarPlus'
import MaterialSystemUserTable from '../../components/MaterialSystemUserTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'
import './UserDetailsTableWithPaginationAndSearch.css'



function SystemUsersTableWithPagenationAndSearch(props) {
    const { rowsPerPage, setRowsPerPage, rows, setPage, page, database,fetchAllSystemUsers} = props;
    const [searchValue, setsearchValue] = useState("");
    // console.log(rows);

    const requestSearch = (rows) => {
        return rows.filter((row) => row.username.toLowerCase().includes(searchValue.toLowerCase())||row.email.toLowerCase().includes(searchValue.toLowerCase()))
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
                    <MaterialSystemUserTable rowsPerPage={rowsPerPage} page={page} rows={requestSearch(rows)} database={database} fetchAllSystemUsers={fetchAllSystemUsers}/>
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default SystemUsersTableWithPagenationAndSearch
