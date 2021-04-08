import React from 'react';

//Import components from Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//Import components
import ButtonLink from '../../Shared/ButtonLink';

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
              <StyledTableCell align="right">{row.status}</StyledTableCell>
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
      <ButtonLink path="/quizes/choose-ext-quiz" component={<EditIcon />}>
        Edit Question
      </ButtonLink>
      <ButtonLink path="/quizes/choose-ext-quiz" component={<DeleteIcon />}>
        Delete Question
      </ButtonLink>
    </TableContainer>
    
  );
}