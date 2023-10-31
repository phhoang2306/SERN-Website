import userService from '../services/userServces';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password){
        return res.status(200).json({
            result:{
                errCode: 1, 
                message: 'Missing inputs paramaters'
            }
        })
    }
    let result = await userService.handleUserLogin(req.body)
    return res.status(200).json({
        result
    })
}
let handleGetAllUsers = async (req, res) =>{
    let id = req.query.id;
    if (!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter',
            data: {}
        })
    }
    let users = await userService.handleGetAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Get information successfully!',
        data: users
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}