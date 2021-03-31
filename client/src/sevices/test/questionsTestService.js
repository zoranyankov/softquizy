const testQuestionInput = (field, strToTest) => {
    const length = strToTest.length;
    console.log(length);
    console.log('inTEsting');
    if(length >= 10 && length <= 100) {
        return null;
    }
    if (length < 10) {
        return `${field} must be at least 10 characters long`;
    }
    if (length > 100) {
        return `${field} can be maximum 100 characters long`;
    }
}

export default testQuestionInput;