import React from 'react'
import MaterialSearchBar from '../../components/MaterialSearchBar'
import MaterialUpdateLogTable from '../../components/MaterialUpdateLogTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'
import './UserDetailsTableWithPaginationAndSearch.css'



function UpdateLogTableWithPaginationAndSearch(props) {
    const { rowsPerPage, setRowsPerPage, rows, setrows, headings, setPage, page, database, fetchAllDataByOption, setshowTable,showTable } = props;

    return (
        <div className="container">
            {showTable?
            <div>
                <div className="searchBarWrapper" >
                    <MaterialTablePagination rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    <MaterialSearchBar rows={rows} setrows={setrows} database={database} fetchAllDataByOption={fetchAllDataByOption} setshowTable={setshowTable} />
                </div>
                <div className="tableWrapper" >
                    <MaterialUpdateLogTable rowsPerPage={rowsPerPage} headings={headings} page={page} rows={rows} database={database} fetchAllDataByOption={fetchAllDataByOption} />
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default UpdateLogTableWithPaginationAndSearch
