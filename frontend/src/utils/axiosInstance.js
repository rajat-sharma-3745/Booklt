import axios from 'axios';
import { server } from '../utils/apiPaths';

const axiosInstance = axios.create({
    baseURL:server,
})


export default axiosInstance;