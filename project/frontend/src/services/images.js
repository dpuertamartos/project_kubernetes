import axios from 'axios'
const baseUrl = '/api'

const get = () => {
  const request = axios.get(`${baseUrl}/update-image`);
  return request.then(response => response.data);
}

export default { get }