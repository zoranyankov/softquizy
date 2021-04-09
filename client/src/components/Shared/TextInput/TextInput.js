import { withRouter } from 'react-router-dom';

import './TextInput.css';

const TextInput = ({ name, onChange }) => {

    const onButtonClick = (event) => {
        event.preventDefault();
        history.push(path);
    }

    const currParams = {
        "correct_answer": {
            type: "text",
            className: "form-control text",
            placeholder: "Correct answer is...",
        }
    }

    return (
        <textarea
            type={currParams[name].type}
            className={currParams[name].className}
            placeholder={currParams[name].placeholder}
            name={name}
            value={fields.correct_answer}
            onChange={(e) => onChange(e)}
        />
    );
}

export default withRouter(TextInput);