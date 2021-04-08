const testQuestionInput = (strToTest) => {
    const length = strToTest.length;
    if(length >= 3 && length <= 100) {
        return null;
    }
    if (length < 3) {
        return `Field must be at least 3 characters long`;
    }
    if (length > 100) {
        return `Field can be maximum 100 characters long`;
    }
}

export default testQuestionInput;