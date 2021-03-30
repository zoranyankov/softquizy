const testQuestionInput = (field, strToTest) => {
    if (strToTest.length < 10) {
        return `${field} must be at least 10 characters long`;
    } else if (strToTest.length > 100) {
        return `${field} can be maximum 100 characters long`;
    }
    return null;
}

export default testQuestionInput;