import axios from "../axios"

const handleGetTopDoctor = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}
const handleGetAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}
const handleCreeateDoctorInfo = (data) =>{
    return axios.post('/api/create-doctor-info',data);
}
const handleGetDetailDoctor = (id) =>{
    return axios.get(`/api/get-detail-doctor?id=${id}`)
}
export {
    handleGetTopDoctor, handleGetAllDoctors, handleCreeateDoctorInfo, 
    handleGetDetailDoctor
}