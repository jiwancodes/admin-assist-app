import React from 'react'
import MaterialSearchBar from '../../components/MaterialSearchBar'
import MaterialUserDetailTable from '../../components/MaterialUserDetailTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'
import './UserDetailsTableWithPaginationAndSearch.css'



function UserDetailsTableWithPaginationAndSearch(props) {
    const { rowsPerPage, setRowsPerPage, rows, setrows, headings, setPage, page, database, fetchAllDataByOption} = props;

    return (
        <div className="container">
            {rows!==""?
            <div>
                <div className="searchBarWrapper" >
                    <MaterialTablePagination rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    <MaterialSearchBar rows={rows} setrows={setrows} database={database} fetchAllDataByOption={fetchAllDataByOption} />
                </div>
                <div className="tableWrapper" >
                    <MaterialUserDetailTable rowsPerPage={rowsPerPage} headings={headings} page={page} rows={rows} database={database} fetchAllDataByOption={fetchAllDataByOption} />
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default UserDetailsTableWithPaginationAndSearch
