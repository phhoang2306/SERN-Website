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

module.exports = {
    handleLogin: handleLogin
}