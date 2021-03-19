import { SERVER_AUTH_URL } from '../../config/config';

const auth = {
    register: `${SERVER_AUTH_URL}/register`,
    login: `${SERVER_AUTH_URL}/login`,
    verify: `${SERVER_AUTH_URL}/verify`,
}

export default auth;