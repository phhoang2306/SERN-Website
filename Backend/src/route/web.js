import express from "express";
import homeControllers from "../controllers/homeControllers";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControllers.getHomePage);
    router.get('/CRUD', homeControllers.getCRUD);
    router.post('/POST_CRUD', homeControllers.postCRUD);
    return app.use('/', router);
}

module.exports = initWebRoutes