import axios, { AxiosError } from 'axios';

const requestPath = '/request';
const authenticationPath = '/authentication';

const wtAdminApi = (token: String = '') => {
  return axios.create({
    baseURL: 'http://localhost:3100',
    timeout: 3000,
    headers: {
      Authorization: token,
    },
  });
};

const loadAllRequests = async (token: String) => {
  const response = await wtAdminApi(token).get(requestPath);
  return response.data;
};

const login = (username: string, password: string): Promise<string> | never => {
    return wtAdminApi().post<{ error: string | never, token: string | never }>(authenticationPath, {
        username,
        password
    })
        .then(response => {
            return response.data.token;
        })
        .catch((error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                return Promise.reject("Wrong username or password");
            }
            return Promise.reject(error.message);
        });
}

export default { loadAllRequests, login };
