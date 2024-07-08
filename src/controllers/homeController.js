import { Json } from "sequelize/lib/utils";
import db from "../models";
import CRUDService from "../services/CRUDService";
import { json } from "body-parser";
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
    return res.send("post crud");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let infoUserId = await CRUDService.getInfoUserFromId(userId);
        return res.render("editCRUD.ejs", {
            data: infoUserId
        });
    } else {
        return res.send("Not found user id");
    }
}

let updateCRUD = async (req, res) => {
    let data = req.body;
    let dataUpdated = await CRUDService.updateInfoUserFromId(data);
    return res.render("displayCRUD.ejs", {
        dataTable: dataUpdated
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let dataAfterDelete = await CRUDService.deleteInfoUserFromId(userId);
        return res.render("displayCRUD.ejs", {
            dataTable: dataAfterDelete
        });
    } else return res.send("User Not Found");
}

// Object {
//     key: '',
//     value: '',
//}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD
}