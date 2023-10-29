import express from "express";
import homeControllers from "../controllers/homeControllers";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControllers.getHomePage);
    router.get('/CRUD', homeControllers.getCRUD);
    router.post('/POST-CRUD', homeControllers.postCRUD);
    router.get('/GET-CRUD', homeControllers.displayGetCRUD);
    router.get('/EDIT-CRUD', homeControllers.getEditCRUD);
    router.post('/PUT-CRUD', homeControllers.putCRUD)
    return app.use('/', router);
}

module.exports = initWebRoutes