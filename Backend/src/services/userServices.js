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
let handleUserLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = {}
            let user = await db.User.findOne({
                where: {email : data.email},
                raw:true
            });
            if (user){
                let check = await brcypt.compareSync(data.password, user.password);
                if (check){
                    delete user.password;
                    result.errCode = 0;
                    result.message = "Login successfully !";
                    result.data = {
                        'email': user.email,
                        'fullname': user.fullname,
                        'address': user.address,
                        'phone-number': user.phoneNumber,
                    }
                } else {
                    result.errCode = 2;
                    result.message = "Wrong password !";
                }
            } else {
                result.errCode = 3;
                result.message = "Your account doesn't exist";
            }
            resolve(result)
        }catch(e){
            reject(e)
        }
    })
}
let handleGetAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = '';
            if (userId === 'all'){
                result = await db.User.findAll({
                    attributes: {exclude: ['password']},
                    raw:true
                })
            }
            else if(userId !== ''){
                result = await db.User.findOne({
                    where: { id : userId},
                    attributes: {exclude: ['password']}
                })
            }
            resolve(result)
        }catch(e){
            reject(e)
        }
    })
}
let handleCreateNewUser = (data) =>{
    return new Promise ( async(resolve,reject) => {
        try {
            // Check parameters 
            if (!data.email){
                resolve({
                    errCode: 2,
                    message: "Missing email!"
                })
            }
            if (!data.password){
                resolve({
                    errCode: 2,
                    message: "Missing password!"
                })
            }
            // Check email exist or not
            let user = await db.User.findOne({
                where: {email : data.email},
                raw:true
            });
            if(user){
                resolve({
                    errCode: 1,
                    message: "Your email is already used."
                })
            }
            else{
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    fullname: data.fullname,
                    password: hashPassword,
                    address: data.address,
                    gender: data.gender,
                    roleID: data.roleID,
                    phoneNumber: data.phoneNumber,
                    positionID: data.positionID,
                })
                resolve({
                    errCode: 0,
                    message: 'Create successfully'
                })
            }
        } catch(e){
            reject(e)
        }
    })
}
let handleEditUser = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.email = data.email;
                user.fullname = data.fullname;
                user.address = data.address;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                user.roleID = data.roleID;
                user.positionID = data.positionID;
                user.image = data.image;
                await user.save()
                resolve({
                    errCode: 0,
                    message: "Update User successfully!"
                }) 
            } else {
                resolve({
                    errCode: 2,
                    message: "Can't find user"
                })
            }
            
        }catch(e){
            reject(e)
        }
    })
}
let handleDeleteUser = (id) =>{
    return new Promise(async (resolve, reject) =>{
            let user = await db.User.findOne({where: {id: id}})
            if (!user) {
                resolve({
                    errCode: 2, 
                    message: "Account doesn't exist!"
            })}
            else {
                await user.destroy()
                resolve({
                    errCode: 0, 
                    message: "Delete user successfully!"
                })
            }
    })
}
let handleGetAllCodes = (typeInput) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let res = {}
            if(!typeInput){
                res.errCode = 1,
                res.message = "Missing required paramters"
                resolve(res);
            }
            let allcode = await db.Allcode.findAll({
                where: {type : typeInput}
            });
            res.errCode = 0,
            res.data = allcode;
            resolve(res);
        } catch(e){
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCodes: handleGetAllCodes
}