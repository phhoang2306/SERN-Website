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
                    attributes: {exclude: ['password']}
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
            resolve({
                errCode: 0,
                message: 'Create successfully'
            })
        } catch(e){
            reject(e)
        }
    })
}
let handleEditUser = () =>{

}
let handleDeleteUser = (id) =>{
    return new Promise(async (resolve, reject) =>{
            let user = await db.User.findOne({where: {id: id}})
            if (!user) {
                resolve({
                    errCode: 2, 
                    message: "Account doesn't exist!"
            })}
            await user.destroy()
            resolve({
                errCode: 0, 
                message: "Delete user successfully!"
            })
        })}
module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}