import brcypt from 'bcrypt';
import db from '../models/index'

const salt = brcypt.genSaltSync(10);
// Hash password 
let hashUserPassword = (password) =>{
    return new Promise( async (resolve, reject) => {
        try{
            let hash = await brcypt.hashSync(password, salt);
            resolve(hash);
        }catch(e){
            reject(e);
        }
    })
}


let createNewUser = async (data) =>{
    return new Promise ( async(resolve,reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                fullname: data.fullname,
                password: hashPassword,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleID,
                phoneNumber: data.phonenumber,
                positionID: data.positionID,
            })
            resolve()
        } catch(e){
            reject(e)
        }
    })
}

let getUserInformation = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = await db.User.findAll({
                raw:true
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    }) 
}

let editUserInformation = (userID) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userID},
                raw: true
            });
            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        }catch(e){
            reject(e)
        }
    })
}
let updateUserInformation = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.fullname = data.fullname;
                user.address = data.address;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                user.roleID = data.roleID;
                user.positionID = data.positionID;
                await user.save();  
            }
            let allUsers = await db.User.findAll({
                raw:true
            });
            resolve(allUsers)
        }catch(e){
            console.log(e);
        }
    })
}
let deleteUser = (id) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: id}
            })
            if (user){
                await user.destroy()
            }
            let allUsers = await db.User.findAll({
                raw:true
            });
            resolve(allUsers)
        }catch(e){
            console.log(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getUserInformation: getUserInformation,
    editUserInformation: editUserInformation,
    updateUserInformation: updateUserInformation,
    deleteUser: deleteUser 
}