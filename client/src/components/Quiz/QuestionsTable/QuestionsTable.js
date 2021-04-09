import React from 'react';

//Import components from Material UI
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, DeleteIcon, EditIcon } from '../../../config/materialConfig';


//Import components
import ButtonLink from '../../Shared/ButtonLink';

//Import constants
import { CATEGORY_NAMES } from '../../../config/config';

import './QuestionTable.css';

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

export default function QuestionsTable({ question }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="right">Difficulty</StyledTableCell>
            <StyledTableCell align="right">Correct Answer</StyledTableCell>
            <StyledTableCell align="right">Wrong Answers</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key={question.question}>
            <StyledTableCell component="th" scope="question">{CATEGORY_NAMES[question.category]}</StyledTableCell>
            <StyledTableCell component="th" scope="question">{question.question}</StyledTableCell>
            <StyledTableCell align="right">{question.difficulty}</StyledTableCell>
            <StyledTableCell align="right">{question.correct_answer}</StyledTableCell>
            <StyledTableCell align="right">{question.incorrect_answers.join(' / ')}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <ButtonLink className="edit-btn" path={`/profile/questions/edit/${question._id}`} component={<EditIcon />}>
        Edit Question
      </ButtonLink>
      <ButtonLink className="delete-btn" path={`/profile/questions/delete/${question._id}`} component={<DeleteIcon />}>
        Delete Question
      </ButtonLink>
    </TableContainer >
  );
}