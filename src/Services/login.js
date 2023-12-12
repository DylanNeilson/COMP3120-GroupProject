import axios from 'axios'
import getURL from './deploy';
const baseURL = getURL();

const login = ({username, password}) =>{
    return axios.post(baseURL + 'login', {username,password})
    .then(response => response.data)
}
export default {login}