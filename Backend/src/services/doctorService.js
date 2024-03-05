import { format } from 'mysql2';
import db from '../models/index'
require('dotenv').config()
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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
            else if (!data.selectedPrice){
                resolve({
                    errCode: 4,
                    message: "Missing selectedPrice!"
                })
            }
            else if (!data.selectedPayment){
                resolve({
                    errCode: 5,
                    message: "Missing selectedPayment!"
                })
            }
            else if (!data.selectedProvince){
                resolve({
                    errCode: 6,
                    message: "Missing selectedProvince!"
                })
            }
            else if (!data.nameClinic){
                resolve({
                    errCode: 7,
                    message: "Missing nameClinic!"
                })
            }
            else if (!data.addressClinic){
                resolve({
                    errCode: 8,
                    message: "Missing addressClinic!"
                })
            }
            else {
                let message = ''
                // Save data into Markdown
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
                // Save data into Doctor info
                let doctor_info = await db.Doctor_Info.findOne({
                        where: {doctorID : data.doctorID},
                        raw: false // raw data can't be saved 
                })
                if(doctor_info){
                    doctor_info.priceID = data.selectedPrice.value,
                    doctor_info.provinceID = data.selectedProvince.value,
                    doctor_info.paymentID = data.selectedPayment.value,
                    doctor_info.addressClinic = data.addressClinic,
                    doctor_info.nameClinic = data.nameClinic,
                    doctor_info.note = data.note
                    await doctor_info.save()
                } else{
                    await db.Doctor_Info.create({
                        doctorID: data.doctorID,
                        priceID : data.selectedPrice.value,
                        provinceID : data.selectedProvince.value,
                        paymentID : data.selectedPayment.value,
                        addressClinic : data.addressClinic,
                        nameClinic : data.nameClinic,
                        note : data.note,
                        count: 10
                    })
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
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
                include: [
                    {model: db.Markdown, as: 'infoData', attributes: ['contentHTML', 'contentMarkdown', 'description']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Doctor_Info, as: 'doctorData', attributes:{exclude: ['doctorID','id', 'createdAt', 'updatedAt']},
                    include: [
                        {model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                        {model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                        {model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']}
                    ]}
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
let handleCreateSchedule = (data) =>{
    return new Promise ( async(resolve,reject) => {
        try {
            if(!data || data.length === 0){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param !'
                })
            }else{
                data = data.map(item =>{
                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                    return item;
                })
                // Check existing 
                let exist = await db.Schedule.findAll({
                    where: { doctorID: data[0].doctorID, date: data[0].date},
                    attributes:['date', 'timeType', 'doctorID', 'maxNumber'],
                    raw: true
                })
                if (exist && exist.length > 0){
                    exist = exist.map(item =>{
                        item.date = new Date(item.date).getTime();
                        return item
                    })
                }
                // Check difference
                let toCreate = _.differenceWith(data, exist, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })

                // Create unexisting ata
                if(toCreate && toCreate.length > 0){
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Create schedule sucessful!'
                })
            }
        } catch(e){
            reject(e)
        }
    })
}
let handleGetSchedule = (doctorID, date ) =>{
    return new Promise ( async(resolve,reject) => {
            try {
                let result = ''
                let formattedDate = new Date(date).toISOString();
                result = await db.Schedule.findAll({
                    where: {doctorID: doctorID, date: formattedDate},
                    include: [
                        {model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi']},
                    ],
                    nest: true
                })
                resolve(result)
            } catch(e){
                reject(e)
            }
        })
}
let handleGetClinicInfo = (id) =>{
     return new Promise(async (resolve, reject) => {
        try{
            let result = '';
            result = await db.Doctor_Info.findOne({
                where: {doctorID: id},
                attributes: ['addressClinic', 'nameClinic'],
                raw: true
            })
            resolve(result)
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    handleGetTopDoctor, handleGetAllDoctors, handleCreateDoctorInfo,
    handleGetDetailDoctor, handleCreateSchedule,handleGetSchedule,
    handleGetClinicInfo: handleGetClinicInfo
}