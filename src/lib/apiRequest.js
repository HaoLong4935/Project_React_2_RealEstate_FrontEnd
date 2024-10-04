import axios from 'axios'
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
const apiReq = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

export default apiReq;