const SERVER_AUTH_URL = 'http://localhost:5000/auth';
const SERVER_API_URL = 'http://localhost:5000/api/questions';

const CATEGORY_NAMES = {
    9: "General Knowledge",
    10: "Entertainment: Books",
    11: "Entertainment: Film",
    12: "Entertainment: Music",
    13: "Entertainment: Musicals &amp; Theatres",
    14: "Entertainment: Television",
    15: "Entertainment: Video Games",
    16: "Entertainment: Board Games",
    17: "Science &amp; Nature",
    18: "Science: Computers",
    19: "Science: Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Entertainment: Comics",
    30: "Science: Gadgets",
    31: "Entertainment: Japanese Anime &amp; Manga",
    32: "Entertainment: Cartoon &amp; Animations",
}

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
    if (body && body !== '') {
        obj = Object.assign(obj, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }
    if (headers) {
        if (!obj.hasOwnProperty(headers)) {
            obj.headers = { "Content-Type": "application/json" };
        }
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
    CATEGORY_NAMES,
    localUser,
    getToken,
}