import { React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BootstrapModal from './BootstrapModal';


const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

function MaterialTable(props) {
    const classes = useStyles2();
    const {rowsPerPage,rows,headings,page,database,fetchAllDataByOption}=props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          {headings ?
            headings.map((i)=><TableCell align="center"><b>{i}</b></TableCell>) :null           
            }
            {/* <TableCell align="center"><b>SN</b></TableCell>
            <TableCell align="center"><b>Username</b></TableCell>
            <TableCell align="center"><b>Phone</b></TableCell>
            <TableCell align="center"><b>Expiry Date</b></TableCell>
            <TableCell align="center"><b>Update Expiry Date</b></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" align="center" scope="row">{i+1+(page* rowsPerPage)}</TableCell>
              <TableCell align="center" >{row.username}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center"><BootstrapModal row={row} database={database} fetchAllDataByOption={fetchAllDataByOption}/></TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default MaterialTable
