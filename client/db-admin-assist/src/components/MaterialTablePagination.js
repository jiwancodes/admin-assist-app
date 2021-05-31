import React from 'react'
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
function MaterialTablePagination(props) {
    const {rows,page,setPage,rowsPerPage,setRowsPerPage}=props;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };  

    return (
        <TablePagination  
        rowsPerPageOptions={[5, 7, 10, 25, 50, 100, { label: 'All', value: -1 }]}
        colSpan={3}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    )
}

export default MaterialTablePagination
