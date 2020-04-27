import axios from 'axios';

const requestPath = '/request';

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

export default { loadAllRequests };
