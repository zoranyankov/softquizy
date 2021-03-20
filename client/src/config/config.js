const SERVER_AUTH_URL = 'http://localhost:5000/auth';
const SERVER_API_URL = 'http://localhost:5000/api/questions';

const getToken = () => {
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    if (!hasToken) {
        return null;
    } else if (!hasToken.hasOwnProperty('token')) {
        return null;
    }
    return hasToken.token;
}

//LOCAL USER SERVICES
const localUser = {
    saveUser(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    getUser() {
        const user = localStorage.getItem('userInfo');
        return user ? JSON.parse(user) : null;
    },
    clearUser() {
        localStorage.removeItem('userInfo');
    }
}

//REQUEST FUNCTION TEMPLATE
async function request(url, method, body, headers) {
    let obj = { method };
    if (body) {
        obj = Object.assign(obj, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }
    if (headers) {
        obj.headers = Object.assign(obj.headers, { ...headers });
    }
    try {
        // console.log(url);
        // console.log(obj);
        let response = await fetch(url, obj);
        let resultData = await response.json();
        return resultData;
    } catch (error) {
        console.log('error');
        console.log(error);
        // notificate('error', error.message);
    }
}

export {
    request as default,
    SERVER_AUTH_URL,
    SERVER_API_URL,
    localUser,
    getToken,
}