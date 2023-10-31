import brcypt from 'bcrypt';
import db from '../models/index'

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
module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers
}