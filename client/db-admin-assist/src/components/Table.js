import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth:1000,
    margin:"auto"
  },
});

export default function BasicTable(props) {
  const classes = useStyles();
  const rows=props.rows;
  console.log(rows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell><b>Id Login</b></TableCell> */}
            <TableCell align="center"><b>Username</b></TableCell>
            <TableCell align="center"><b>Phone</b></TableCell>
            <TableCell align="center"><b>Expiry Date</b></TableCell>
            <TableCell align="center"><b>Update Expiry Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.username}>
            {/* <TableCell component="th" scope="row">{row.idlogin}</TableCell> */}
              <TableCell component="th" align="center" scope="row">{row.username}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center"><button>Update Expiry Date</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
