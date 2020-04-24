import axios from 'axios';
import { api_url } from '../global';


class UserService{
    signin = (user) => {
        return axios.post(`${api_url}/user/login`,user);
    }
    signup(user){
        return axios.post(`${api_url}/user`,user);
    }
    getUser(user){
        return axios.get(`${api_url}/user/${user._id}`)
    }
}
export default UserService;