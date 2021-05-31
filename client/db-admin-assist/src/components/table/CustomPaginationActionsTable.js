import { React, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BootstrapModal from '../BootstrapModal';
import TablePaginationActions from './TablePaginationActions';
import SearchBar from 'material-ui-search-bar'



const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [searchValue, setsearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userDetails, setuserDetails] = useState("");
  const rows = userDetails;


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(()=>{
    setuserDetails(props.rows);
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    setuserDetails()
    // fetchAllDataByOption(chooseDatabase);
  }


  return (
    <div>
      <div style={{
        position: "fixed",
        top: 30, left:0, backgroundColor: "#ffffff", width: '100%',
        display: "flex", justifyContent: "space-between", alignItems:"flex-end",marginBottom:"5px"
      }}>
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
        /> <SearchBar
          value={searchValue}
          onChange={(val) => {
            setsearchValue(val)
            /* requestSearch(searchValue) */
          }}
          onRequestSearch={() => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
          style={{ width: 300 }}
        /></div>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell align="center"><b>SN</b></TableCell>
            <TableCell align="center"><b>Username</b></TableCell>
            <TableCell align="center"><b>Phone</b></TableCell>
            <TableCell align="center"><b>Expiry Date</b></TableCell>
            <TableCell align="center"><b>Update Expiry Date</b></TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" align="center" scope="row">{(i + 1 + (page + 1) * rowsPerPage) - rowsPerPage}</TableCell>
              <TableCell align="center" >{row.username}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center"><BootstrapModal row={row} database={props.database} fetchAllDataByOption={props.fetchAllDataByOption} /></TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}
