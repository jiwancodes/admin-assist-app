import React from 'react'
import MaterialSearchBar from '../../components/MaterialSearchBar'
import MaterialTable from '../../components/MaterialTable'
import MaterialTablePagination from '../../components/MaterialTablePagination'


function TableWithPaginationAndSearch(props) {
    const { rowsPerPage, setRowsPerPage, userDetails, setuserDetails, headings, setPage, page, database, fetchAllDataByOption, setshowTable,showTable } = props;

    return (
        <div className="container">
            {showTable?
            <div>
                <div className="searchBarWrapper" >
                    <MaterialTablePagination rows={userDetails} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    <MaterialSearchBar userDetails={userDetails} setuserDetails={setuserDetails} database={database} fetchAllDataByOption={fetchAllDataByOption} setshowTable={setshowTable} />
                </div>
                <div className="tableWrapper" >
                    <MaterialTable rowsPerPage={rowsPerPage} headings={headings} page={page} rows={userDetails} database={database} fetchAllDataByOption={fetchAllDataByOption} />
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default TableWithPaginationAndSearch
