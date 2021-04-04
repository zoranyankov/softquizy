import { SERVER_AUTH_URL } from '../../config/config';

const auth = {
    //Authentication Endpoints
    register: `${SERVER_AUTH_URL}/register`,
    login: `${SERVER_AUTH_URL}/login`,
    verify: `${SERVER_AUTH_URL}/verify`,
    updateResults: `${SERVER_AUTH_URL}/updateResults`,
}

export default auth;