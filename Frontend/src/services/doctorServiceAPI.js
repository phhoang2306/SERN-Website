import axios from "../axios"

const handleGetTopDoctor = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}
const handleGetAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}
export {
    handleGetTopDoctor, handleGetAllDoctors
}