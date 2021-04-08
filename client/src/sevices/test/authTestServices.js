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
    if (rePassToTest.length < 7) {
        return `Password must be at least 7 characters long`;
    }
}

const validation = (context, {username, password, errors, rePassword}) => {
    if (!username || !password) {
        context.setNotifyList([{ id: 'AllFieldsAreRequired', title: 'Error', description: 'All fields are required', position: 'middle' }]);
        return false;
    }
    if (Object.values(errors).some(x => x)) {
        context.setNotifyList([{ id: 'PleaseFixYourWrongInputs', title: 'Error', description: 'Please Fix Your Wrong Inputs', position: 'middle' }]);
        return false;
    }
    if (rePassword && (rePassword !== password)) {
        context.setNotifyList([{ id: 'Both passwords must match', title: 'Error', description: 'Both passwords must match' }])
        return false;
    }
    return true;
}

const testAuthInput = {};
testAuthInput.values = { username, password, rePassword };
testAuthInput.validation = validation;

export default testAuthInput;