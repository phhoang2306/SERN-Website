import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // form into json form.
        });
    } catch(error){
        console.log(error)  
    }
}
let getCRUD= async (req, res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.send("Sign in successfully");
}
let displayGetCRUD = async(req, res) =>{
    let data = await CRUDService.getUserInformation()
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
}
module.exports = {
    getHomePage : getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD
}