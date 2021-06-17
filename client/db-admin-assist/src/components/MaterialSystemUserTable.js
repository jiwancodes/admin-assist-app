import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import BootstrapModal from './BootstrapModal';
import PasswordChangeModal from './PasswordChangeModal';
import DeleteDialogBox from './DeleteDialogBox';
// import { Button } from 'react-bootstrap'
// import DeleteAlert from './DeleteAlert';
// import { useHistory } from 'react-router';
// import MaterialDeleteAlert from './MaterialDeleteAlert';


const useStyles2 = makeStyles({
  table: {
    // minWidth: 500,
  },
});

function MaterialSystemUserTable(props) {
  const classes = useStyles2();
  // const [alert , setalert]= useState(true);
  const { rowsPerPage, rows, page, database,fetchAllSystemUsers } = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>SN</b></TableCell>
            <TableCell align="center"><b>Username</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Change Password</b></TableCell>
            <TableCell align="center"><b>Delete User</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" align="center" scope="row">{i + 1 + (page * rowsPerPage)}</TableCell>
              <TableCell align="center" >{row.username}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center"><PasswordChangeModal row={row} database={database} name="Change Password" variant="warning" /></TableCell>
              <TableCell align="center"> <DeleteDialogBox row={row} fetchAllSystemUsers={fetchAllSystemUsers}/> </TableCell>
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

export default MaterialSystemUserTable
