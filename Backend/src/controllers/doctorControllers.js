import doctorService from '../services/doctorService'

let handleGetTopDoctor = async(req, res) =>{
    let limit = req.query.limit
    try{
        let doctors = await doctorService.handleGetTopDoctor(+limit) // Convert into int var
        return res.status(200).json({
            errCode: 0,
            message: "Get top doctors sucessfully !",
            data: doctors
        })
    } catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}
let handleGetAllDoctors = async (req, res) =>{
    let doctors = await doctorService.handleGetAllDoctors()
    return res.status(200).json({
        errCode: 0,
        errMessage: "Get all doctor's information successfully!",
        data: doctors
    })
}
let handleCreateDoctorInfo = async(req, res) =>{
    let message = await doctorService.handleCreateDoctorInfo(req.body);
    return res.status(200).json(message);
}
let handleGetDetailDoctor = async(req, res) =>{ 
    let id = req.query.id;
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter id!',
            data: {}
        })
    }
    let data = await doctorService.handleGetDetailDoctor(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Get information successfully!',
        data: data
    })
}
let handleCreateSchedule = async(req, res) =>{ 
    let data = req.body;
    if(!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter!',
        })
    }
    else {
        await doctorService.handleCreateSchedule(data)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Create data successfully',
        })
    }
}
let handleGetSchedule = async(req, res) =>{
    let doctorID = req.query.id;
    let date = req.query.date
    if(!doctorID || !date )
        return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing parameter!',
                data: {}
        })
    let data = await doctorService.handleGetSchedule(doctorID, +date)
     return res.status(200).json({
        errCode: 0,
        errMessage: 'Get information successfully!',
        data: data
    })
}
let handleGetClinicInfo = async(req, res) =>{ 
    let doctorid = req.query.id;
    if(!doctorid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter id!',
            data: {}
        })
    }
    let data = await doctorService.handleGetClinicInfo(doctorid)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Get information successfully!',
        data: data
    })
}
module.exports = {
    handleGetTopDoctor, handleGetAllDoctors, handleCreateDoctorInfo,
    handleGetDetailDoctor, handleCreateSchedule, handleGetSchedule,
    handleGetClinicInfo: handleGetClinicInfo
}