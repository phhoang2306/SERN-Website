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
const handleCreateSchedule =(data) =>{
    return axios.post(`/api/create-doctor-schedule`, data)
}
const handleGetDoctorSchedule = (id, date) =>{
    return axios.get(`/api/get-schedule-doctor?id=${id}&date=${date}`)
}
export {
    handleGetTopDoctor, handleGetAllDoctors, handleCreeateDoctorInfo, 
    handleGetDetailDoctor, handleCreateSchedule, handleGetDoctorSchedule
}