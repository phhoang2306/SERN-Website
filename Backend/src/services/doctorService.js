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
                    errCode: 1,
                    message: "Missing content HTML!"
                })
            }
            else if (!data.contentMarkdown){
                resolve({
                    errCode: 2,
                    message: "Missing content Markdown!"
                })
            }
            else if (!data.doctorID){
                resolve({
                    errCode: 3,
                    message: "Missing doctorID!"
                })
            }
            else {
                let message = ''
                if(data.action === 'EDIT'){
                    let info = await db.Markdown.findOne({
                        where: {doctorID : data.doctorID},
                        raw: false // raw data can't be saved 
                    })
                        info.contentHTML = data.contentHTML,
                        info.contentMarkdown = data.contentMarkdown,
                        info.description = data.description,
                        info.updateAt =  new Date();
                        await info.save()
                        message = "Save doctor's information succesfully!"
                } else{ // Create an info
                   await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorID: data.doctorID
                    })
                    message = "Create doctor's information successfully!"
                }
                resolve({
                    errCode: 0,
                    message: message
                })
            }
        } catch(e){
            reject(e)
        }
    })
}
let handleGetDetailDoctor = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let result = '';
            result = await db.User.findOne({
                where: {id: id},
                attributes: {exclude: ['password', 'image', 'createdAt', 'updatedAt']},
                include: [
                    {model: db.Markdown, as: 'infoData', attributes: ['contentHTML', 'contentMarkdown', 'description']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            })
            resolve(result)
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
   handleGetTopDoctor, handleGetAllDoctors, handleCreateDoctorInfo,
   handleGetDetailDoctor
}