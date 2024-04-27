import axios from 'axios'
const baseUrl = '/api/todos'

const get = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then(response => response.data);
}

const create = (todo) => {
  const request = axios.post(`${baseUrl}`, todo)  
  return request.then(response=>response.data)
}

export default { get, create }