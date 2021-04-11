import React from 'react';

//Import components from Material UI
import {
  withStyles, makeStyles, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TableFooter, DoneOutlineIcon, CancelIcon
} from '../../../config/materialConfig';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    position: 'center',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    fontSize: 17,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ResultsTable({ rows, score, quizName }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">N: </StyledTableCell>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="right">Your Answer</StyledTableCell>
            <StyledTableCell align="right">Correct Answer</StyledTableCell>
            <StyledTableCell align="right">Result</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={row.question}>
              <StyledTableCell align="right">{i + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.question}</StyledTableCell>
              <StyledTableCell align="right">{row.selected}</StyledTableCell>
              <StyledTableCell align="right">{row.correctAnswer}</StyledTableCell>
              <StyledTableCell align="right">{row.status === 'correct' ? <DoneOutlineIcon /> : <CancelIcon />}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow /><StyledTableRow /><StyledTableRow />
          <StyledTableRow>
            <StyledTableCell colSpan={4} align="right">You have finished the {quizName} quiz and your result is: </StyledTableCell>
            <StyledTableCell align="right" >{score} Pts</StyledTableCell>
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}