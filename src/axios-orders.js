import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://react-burger-app-8d601.firebaseio.com' });

export default axiosInstance;