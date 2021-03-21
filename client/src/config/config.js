const SERVER_AUTH_URL = 'http://localhost:5000/auth';
const SERVER_API_URL = 'http://localhost:5000/api/questions';

const CATEGORY_IMAGES = {
    6: "https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg",
    7: "https://thumbs.dreamstime.com/b/set-geography-symbols-equipments-web-banners-vintage-outline-sketch-web-banners-doodle-style-education-concept-back-to-136641038.jpg",
    8: "http://www.heptx.com/wp-content/uploads/2018/02/Classical-History-MS-300x300.jpg",
}

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export {
    request as default,
    SERVER_AUTH_URL,
    SERVER_API_URL,
    CATEGORY_NAMES,
    CATEGORY_IMAGES,
    localUser,
    getToken,
    shuffleArray,
}