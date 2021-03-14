import api from './api';

//REQUEST FUNCTION TEMPLATE
async function request(url, method, body) {
    let obj = { method };
    if (body) {
        obj = Object.assign(obj, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    try {
        let response = await fetch(url, obj);
        let resultData = await response.json();
        return resultData;
    } catch (error) {
        console.log('error');
        console.log(error);
        // notificate('error', error.message);
    }
}

// //LOCAL USER SERVICES
// const localUser = {
//     saveUser(userInfo) {
//         localStorage.setItem('userInfo', JSON.stringify(userInfo));
//     },
//     getUser() {
//         const user = localStorage.getItem('userInfo');
//         return user ? JSON.parse(user) : null;
//     },
//     clearUser() {
//         localStorage.removeItem('userInfo');
//     }
// }

const register = (data) => {
    return request(api.register, "POST", data)
}

const authService = {
    register,
};

export default authService;