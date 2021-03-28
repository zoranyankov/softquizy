import { withRouter } from 'react-router-dom';

//Import components from Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './ButtonLink.css';

//Make custom styles for Material UI Button component
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        backgroundColor: 'skyblue',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
    create_button: {
        backgroundColor: 'green',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
}));

const ButtonLink = ({ history, children, path, component, type }) => {

    const onButtonClick = (event) => {
        event.preventDefault();
        history.push(path);
    }

    //Apply materials custom styles
    const classes = useStyles();

    if (type === 'submit') {
        return (
            <Button
                size='large'
                className={classes.button}
                variant="contained"
                color="primary"
                // href="/quizes/create-question"
                type="submit"
                startIcon={component}
            >
                {children}
            </Button>
        )
    }

    return (
        <Button
            size='large'
            className={classes.button}
            variant="contained"
            color="primary"
            // href="/quizes/create-question"
            onClick={(e) => onButtonClick(e)}
            startIcon={component}
        >
            {children}
        </Button>
    );
}

export default withRouter(ButtonLink);