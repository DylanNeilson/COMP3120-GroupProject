import axios from 'axios'
import getURL from './deploy';
const baseURL = getURL();

const signup = async ({username, password, firstname,lastname, setflag}) =>{
    console.log("entered function ")
    try{
        console.log("entered axios ")
    return await axios.post(baseURL + 'sign_up', {username,password,firstname,lastname})
    .then(response => response.data,
        setflag(1))
    } catch (error){
        console.error("Unable to create new user:", error);
setflag(-1)
    }
}
export default {signup}