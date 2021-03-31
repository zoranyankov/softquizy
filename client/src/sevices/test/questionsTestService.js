const testQuestionInput = (field, strToTest) => {
    const length = strToTest.length;
    console.log(length);
    console.log('inTEsting');
    if(length >= 10 && length <= 100) {
        return null;
    }
    if (length < 10) {
        return `Field must be at least 10 characters long`;
    }
    if (length > 100) {
        return `Field can be maximum 100 characters long`;
    }
}

export default testQuestionInput;