const username = (nameToTest) => {
    if (nameToTest.length < 5) {
        return `Username must be at least 5 characters long`;
    } 
    return null;
}

const password = (passToTest) => {
    if (passToTest.length < 7) {
        return `Password must be at least 7 characters long`;
    } 
    return null;
}

const rePassword = (rePassToTest) => {
    if(rePassToTest.length < 7) {
        return `Password must be at least 7 characters long`;
    }
}

const testAuthInput =  {username, password, rePassword};

export default testAuthInput;