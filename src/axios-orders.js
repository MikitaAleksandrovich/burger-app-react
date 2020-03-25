import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-react-40887.firebaseio.com/'
});

export default instance;

