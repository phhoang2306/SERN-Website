import userService from '../services/userServices';

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
let handleCreateNewUser = async (req, res) => {
    let message = await userService.handleCreateNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let message = await userService.handleEditUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser:  handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}