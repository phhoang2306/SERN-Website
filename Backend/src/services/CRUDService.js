import brcypt from 'bcrypt';

const salt = brcypt.genSaltSync(10);

let createNewUser = async (data) =>{
    let hashPassword = await hashUserPassword(data.password)
    console.log(hashPassword)
    console.log(data)
}
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

module.exports = {
    createNewUser:createNewUser
}