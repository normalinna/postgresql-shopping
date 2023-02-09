const ProductService = require("../services/product.service");

class productController {
    productService = new ProductService()

    getProducts = async(req, res, next) => {
    
        try {
            const { products, inventory } = await this.productService.getProducts();
            res.status(200).json({ products, inventory });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = productController;
