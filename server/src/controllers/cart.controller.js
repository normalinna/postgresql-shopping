const CartService = require("../services/cart.service");

class CartController {
    cartService = new CartService()

    addToCart = async(req, res, next) => {
        const data = req.body;
    
        try {
            const { productsCart } = await this.cartService.addToCart(data);
            res.status(200).json({ productsCart });
        } catch (error) {
            next(error);
        }
    }

    getProductsInCart = async(req, res, next) => {
        const data = req.body;
    
        try {
            const { products } = await this.cartService.getProductsInCart(data);
            if (!products || products.length == 0) {
                return res.status(404).end();
            }
            res.status(200).json({ products });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CartController;
