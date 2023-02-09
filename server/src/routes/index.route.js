const { Router } = require("express");
const IndexController = require("../controllers/index.controller");

class IndexRoute {
    router = new Router();
    indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/api", this.indexController.index)
    }
}

module.exports = IndexRoute;
