const express = require('express');
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/atn', (req, res) => {
        return res.send('Hello world with atn!');
    })

    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;