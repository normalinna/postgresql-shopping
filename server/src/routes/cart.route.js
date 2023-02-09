const { Router } = require("express");
const CartController = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/auth.middleware");

class CartRoute {
    router = new Router();
    cartController = new CartController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/api/cart/add", authMiddleware, this.cartController.addToCart);
        this.router.post("/api/cart", authMiddleware, this.cartController.getProductsInCart);
    }
}

module.exports = CartRoute;
