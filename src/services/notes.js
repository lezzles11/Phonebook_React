import axios from 'axios'
import { request } from 'https';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, update}
