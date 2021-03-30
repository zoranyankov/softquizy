const username = (nameToTest) => {
    if (nameToTest.length < 5) {
        return `Username must be at least 5 characters long`;
    } 
    return null;
}

const password = (passToTest) => {
    if (passToTest.length < 8) {
        return `Password must be at least 8 characters long`;
    } 
    return null;
}

const rePassword = (rePassToTest) => {
    if(rePassToTest.length < 8) {
        return `Password must be at least 8 characters long`;
    }
}

const testInput =  {username, password, rePassword};

export default testInput;