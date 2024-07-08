import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/update-crud', homeController.updateCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)
    // rest api, create - put, delete - delete, update - put
    return app.use("/", router)
}

module.exports = initWebRoutes;