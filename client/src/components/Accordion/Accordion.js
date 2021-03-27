import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ResultsTable from '../Quiz/ResultsTable';
import QuestionsTable from '../Quiz/QuestionsTable';

import { CATEGORY_NAMES } from '../../config/config';


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
            {data.map(table => (
                <div className="quiz-results" key={table._id}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>
                                {type === 'results'
                                    ? `${table.quizName} with ${table.score} Pts`
                                    : CATEGORY_NAMES[table.category]
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

// import { useState } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';

// import ResultsTable from '../Quiz/ResultsTable';

// const Accordion = withStyles({
//     root: {
//         border: '1px solid rgba(0, 0, 0, .125)',
//         boxShadow: 'none',
//         '&:not(:last-child)': {
//             borderBottom: 0,
//         },
//         '&:before': {
//             display: 'none',
//         },
//         '&$expanded': {
//             margin: 'auto',
//         },
//     },
//     expanded: {},
// })(MuiAccordion);

// const AccordionSummary = withStyles({
//     root: {
//         backgroundColor: 'rgba(0, 0, 0, .03)',
//         borderBottom: '1px solid rgba(0, 0, 0, .125)',
//         marginBottom: -1,
//         minHeight: 56,
//         '&$expanded': {
//             minHeight: 56,
//         },
//     },
//     content: {
//         '&$expanded': {
//             margin: '12px 0',
//         },
//     },
//     expanded: {},
// })(MuiAccordionSummary);

// const AccordionDetails = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiAccordionDetails);

// export default function CustomizedAccordions({ data }) {
//     const [expanded, setExpanded] = useState('panel1');

//     const handleChange = (panel) => (event, newExpanded) => {
//         setExpanded(newExpanded ? panel : false);
//     };

//     return (
//         <div>
//             {data.map(table => (
//                 <div className="quiz-results" key={table._id}>
//                     <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//                         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//                             <Typography>Collapsible Group Item #1</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             {/* <Typography> */}
//                                 <ResultsTable rows={table.userResults} score={table.score} quizName={table.quizName} />
//                             {/* </Typography> */}
//                         </AccordionDetails>
//                     </Accordion>
//                 </div>
//             ))}
//         </div>
//     );
// }