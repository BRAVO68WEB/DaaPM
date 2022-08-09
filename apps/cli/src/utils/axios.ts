import axios from 'axios';
import {
    getConfig
} from './confStore'

let token = getConfig('apiKey') as string;
token = token + ":"

export default axios.create({
    baseURL: 'https://api.doppler.com/v3',
    headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(token),
    }
})