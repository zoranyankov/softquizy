

const Quizheader = (props) => {
    return (
        <div>
            <h1>{props.quizName || "DEFALUT QUIZ NAME"}</h1>
        </div>
    );
}

export default Quizheader;