const SERVER_AUTH_URL = `${process.env.REACT_APP_API_URL}auth`;
const API_QUESTION_URL = `${process.env.REACT_APP_API_URL}api/questions`;
const API_RESULT_URL = `${process.env.REACT_APP_API_URL}api/results`;
const TRIVIA_API_URL = 'https://opentdb.com/api.php';

//Trivia find names by category number
const CATEGORY_NAMES = {
    6: "Math",
    7: "Geography",
    8: "History",
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

//Get current Token 
const getToken = () => {
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    if (!hasToken) {
        return null;
    } else if (!hasToken.hasOwnProperty('token')) {
        return null;
    }
    return hasToken.token;
}

//LOCAL USER SERVICES - optional
const localUser = {
    saveUser(userInfo) {
        localStorage.setItem('sid', JSON.stringify(userInfo));
    },
    getUser() {
        const user = localStorage.getItem('sid');
        return user ? JSON.parse(user) : null;
    },
    clearUser() {
        localStorage.removeItem('sid');
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
            body: JSON.stringify(body),
        })
    }
    if (headers) {
        if (!obj.hasOwnProperty(headers)) {
            obj.headers = { "Content-Type": "application/json" };
        }
        obj.headers = Object.assign(obj.headers, { ...headers });
    }
    try {
        let response = await fetch(url, obj);
        if (response.status === 204) {
            // return {errors: {error: 'You still didn\'t finish any quizes'}}
            throw new Error('No data')
        } else if (response.status === 404) {
            throw new Error('Not Found')
            // } else if (response.status === 422) {
            //     throw new Error(`${response.message}`)
        }
        let resultData = await response.json();
        return resultData;
    } catch (error) {
        console.log('In request function catch', error);
        throw error;
    }
}

//Function to mix the answers (questions)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Optional function for HTMLEncoding
function HTMLEncode(str) {
    var i = str.length,
        aRet = [];

    while (i--) {
        var iC = str[i].charCodeAt();
        if (iC < 65 || iC > 127 || (iC > 90 && iC < 97)) {
            aRet[i] = '&#' + iC + ';';
        } else {
            aRet[i] = str[i];
        }
    }
    return aRet.join('');
}

export {
    request as default,
    SERVER_AUTH_URL,
    API_QUESTION_URL,
    API_RESULT_URL,
    TRIVIA_API_URL,
    CATEGORY_NAMES,
    localUser,
    getToken,
    shuffleArray,
    HTMLEncode,
}