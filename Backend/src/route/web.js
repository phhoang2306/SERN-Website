import express from "express";
import homeControllers from "../controllers/homeControllers";
import userControllers from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControllers.getHomePage);
    router.get('/CRUD', homeControllers.getCRUD);
    router.post('/POST-CRUD', homeControllers.postCRUD);
    router.get('/GET-CRUD', homeControllers.displayGetCRUD);
    router.get('/EDIT-CRUD', homeControllers.getEditCRUD);
    router.post('/PUT-CRUD', homeControllers.putCRUD);
    router.get('/DEL-CRUD', homeControllers.deleteCRUD);
    router.post('/api/login', userControllers.handleLogin);
    router.get('/api/get-all-users', userControllers.handleGetAllUsers);
    router.post('/api/create-new-user', userControllers.handleCreateNewUser);
    router.put('/api/edit-user', userControllers.handleEditUser);
    router.delete('/api/delete-user', userControllers.handleDeleteUser);
    return app.use('/', router);
}

module.exports = initWebRoutes