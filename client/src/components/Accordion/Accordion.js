import React from 'react';

//Import components from Material UI
import { makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography, ExpandMoreIcon,} from '../../config/materialConfig';

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
                            <Typography component={'span'} className={classes.heading}>
                                {type === 'results'
                                    ? <div className="accordion-header">
                                        <span className="accordion-points">
                                            {table.quizName} with <strong>{table.score}</strong> Pts
                                        </span>
                                        <br />
                                        <span className="accordion-date">
                                            Quiz has been taken on:  {(new Date(table.createdAt)).toLocaleString()}
                                        </span>
                                    </div>
                                    : <div className="accordion-header">
                                        <span className="accordion-points">
                                            {CATEGORY_NAMES[table.category]}
                                        </span>
                                        <br />
                                        <span className="accordion-date">
                                            Question has been created on: {(new Date(table.createdAt)).toLocaleString()}
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