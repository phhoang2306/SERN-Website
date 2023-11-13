import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/api/login', {email, password});
}
const getAllUSers = (id) =>{
    return axios.get(`/api/get-all-users?id=${id}`)
}
const handlegetAllCodes = (type) =>{
    return axios.get(`/api/get-allcodes?type=${type}`)
}
const handleCreateUSer = (data) =>{
    return axios.post('/api/create-new-user',data);

}
export {handleLogin, getAllUSers, handlegetAllCodes, handleCreateUSer}