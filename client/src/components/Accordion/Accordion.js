import React from 'react';

//Import components from Material UI
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Import components
import ResultsTable from '../Quiz/ResultsTable';
import QuestionsTable from '../Quiz/QuestionsTable';

//Import constants
import { CATEGORY_NAMES } from '../../config/config';

import './Accordion.css';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SimpleAccordion({ data, type }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(data.length !== 0) && data.map(table => (
                <div className="quiz-results" key={table._id}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>
                                {type === 'results'
                                    ? <div className="accordion-header">
                                        <span className="accordion-points">
                                            {table.quizName} with {table.score} Pts
                                        </span>
                                        <br />
                                        <span className="accordion-date">
                                            Quiz is made on:  {(new Date(table.createdAt)).toLocaleDateString()}
                                        </span>
                                    </div>
                                    // ? `${table.quizName} with ${table.score} Pts |------------------> Quiz is made on: ${table.createdAt.slice(0, 19).replace('T', ' at: ')}`
                                    : <div className="accordion-header">
                                        <span className="accordion-points">
                                            {CATEGORY_NAMES[table.category]}
                                        </span>
                                        <br />
                                        <span className="accordion-date">
                                            Question is made on: {(new Date(table.createdAt)).toLocaleDateString()}
                                        </span>
                                    </div>
                                }
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <Typography> */}
                            {type === 'results'
                                ? <ResultsTable rows={table.userResults} score={table.score} quizName={table.quizName} />
                                : <QuestionsTable question={table} />
                            }
                            {/* </Typography> */}
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}