import db from "../models";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
    let data = await db.User.findAll();
    return res.render('homePage.ejs', {
        data: JSON.stringify(data)
    });
}

let getAboutPage = (req, res) => {
    return res.render('test/aboutPage.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("post crud");
}
// Object {
//     key: '',
//     value: '',
//}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}