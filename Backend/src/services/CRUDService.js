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
                phoneNumber: data.phoneNumber,
                positionID: data.positionID,
            })
            resolve()
        } catch(e){
            reject(e)
        }
    })
}


module.exports = {
    createNewUser:createNewUser
}