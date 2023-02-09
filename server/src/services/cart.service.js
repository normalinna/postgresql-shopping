const { sequelize } = require("../database");
const DB = require("../database");
const HttpException = require("../exceptions/httpExceptions");

class CartService {
    carts = DB.Carts;
    cartItems = DB.CartItems;
    products = DB.Products;

    async addToCart(data) {
        if(!data) {
            new HttpException(400, "You're not data");
        }

        const productsCart = await this.createCart(data);
        return { productsCart };
    }

    async getProductsInCart(data) {
        if(!data) {
            new HttpException(400, "You're not data");
        }

        const products = await this.getProducts(data.userId);
        return { products }
    }

    async getProducts(userId) {
        const carts = await this.carts.findAll({
            where: { userId: userId },
            raw: true
        }).catch(err=> console.error(err));

        const ids = carts.map(el => el.id)
        const products = await this.cartItems.findAll({
            where: {
                cartId: ids
            },
            include: [{
                model: this.products,
                as: 'products'
            }],
        }).catch(err => console.log(err));

        return products;
    }

    async createCart(data) {
        const { productId, userId } = data
        let productsCart = [];

        try {
            let product = await this.products.findByPk(productId).catch(err => console.log(err));

            let carts = await this.carts.findAll({
                where: {
                    userId: userId
                },
                raw: true,
            }).catch(err => console.error(err));

            if (!carts.length) {
                let newCart = await this.carts
                    .build({
                        userId: userId
                    })
                    .save().catch(err=> console.error(err));
                let productCart = await this.createNewCartItem({ productId, newCartId: newCart.id });
                productsCart.push(productCart)

            } else if (carts.length) {
                let productCart = await this.cartItems.findOne({
                    where: {
                        cartId: carts[0].id,
                        productId: product.id
                    },
                }).catch(err=> console.error(err));

                if (productCart === null) {
                    await this.createNewCartItem({productId, newCartId: carts[0].id});
                } else {
                    await productCart.update({
                        quantity: productCart.quantity + 1
                    }).catch(err=> console.error(err));
                }

                productsCart = await this.cartItems.findAll({
                    where: {
                        cartId: carts[0].id,
                    },
                    include: [{
                        model: this.products,
                        as: 'products'
                    }],
                    raw: true
                }).catch(err => console.error(err));
                return productsCart;
        }


        } catch(err) {
            new HttpException(400, err.message);
        }
    }

    async getCartItem(data) {
        const {productId, userId} = data
        const cartItem = await this.cartItems.findOne({
            where: {
                productId: productId,
                userId: userId
            }
        }).catch(err => console.log(err));
        return cartItem;
    }

    async createNewCartItem(data) {
        const {productId, newCartId} = data

        try {
            let productCart = await this.cartItems.create({
                cartId: newCartId,
                productId: productId,
                quantity: 1
            }).then(response => (response.get({plain: true})))
            .catch(err => console.log(err));

            return productCart;
        } catch(err) {
            new HttpException(400, err.message);
        }
    }
}

module.exports = CartService;
