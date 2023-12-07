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

module.exports = {
    handleGetTopDoctor
}