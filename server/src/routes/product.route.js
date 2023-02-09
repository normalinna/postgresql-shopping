const { Router } = require("express");
const ProductController = require("../controllers/product.controller");

class ProductRoute {
    router = new Router();
    productController = new ProductController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/api/products", this.productController.getProducts)
    }
}

module.exports = ProductRoute;
