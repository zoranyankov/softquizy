import { withRouter } from 'react-router-dom';

//Import components from Material UI
import { Button, makeStyles } from '../../../config/materialConfig';

import './ButtonLink.css';

//Make custom styles for Material UI Button component
const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: 'skyblue',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    }
}));

const ButtonLink = ({ history, children, path, component, type, setColor }) => {

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
                // color="primary"
                color={setColor || "primary"}
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
            onClick={(e) => onButtonClick(e)}
            startIcon={component}
        >
            {children}
        </Button>
    );
}

export default withRouter(ButtonLink);