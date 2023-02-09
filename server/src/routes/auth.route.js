const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");

class AuthRoute {
    router = new Router();
    authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/api/auth/login", this.authController.login)
    }
}

module.exports = AuthRoute;