import db from '../models/index'

let handleGetTopDoctor = (limit) => {
    return new Promise (async(resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                limit: limit,
                where: {roleID:"R2"},
                attributes: {exclude: ['password']},
                include: [
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            });
            resolve(doctor)
        } catch(e){
            reject(e)
        }
    })
}
let handleGetAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = '';
            result = await db.User.findAll({
                where: {roleID : 'R2'},
                attributes: {exclude: ['password','image']},
                raw:true
            })
            resolve(result)
        }catch(e){
            reject(e)
        }
    })
}
let handleCreateDoctorInfo = (data) =>{
    return new Promise ( async(resolve,reject) => {
        try {
            // Check parameters 
            if (!data.contentHTML){
                resolve({
                    errCode: 2,
                    message: "Missing content HTML!"
                })
            }
            if (!data.contentMarkdown){
                resolve({
                    errCode: 2,
                    message: "Missing content Markdown!"
                })
            }
            if (!data.doctorID){
                resolve({
                    errCode: 2,
                    message: "Missing doctorID!"
                })
            }
            await db.Markdown.create({
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                description: data.description,
                doctorID: data.doctorID
            })
            //console.log(data)
            resolve({
                errCode: 0,
                message: 'Create successfully'
            })
        } catch(e){
            reject(e)
        }
    })
}
module.exports = {
   handleGetTopDoctor, handleGetAllDoctors, handleCreateDoctorInfo
}