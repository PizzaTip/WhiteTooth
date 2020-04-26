import axios, { AxiosError } from 'axios';

export class ApiClient {
    static BASE_API_URL = `http://localhost:3100`;

    static Login(username: string, password: string): Promise<string> | never {
        return axios.post<{ error: string | never, token: string | never }>(`${this.BASE_API_URL}/authentication`, {
            username,
            password
        })
            .then(response => {
                return response.data.token;
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    throw "Wrong username or password";
                }
                throw error.message;
            });
    }
}