import axios from "../axios"

const handleGetTopDoctor = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}
export {
    handleGetTopDoctor
}