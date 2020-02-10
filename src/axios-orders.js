import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-a6388.firebaseio.com/'
});

export default instance;