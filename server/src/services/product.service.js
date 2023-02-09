const { sequelize } = require("../database");
const DB= require("../database");
const HttpException = require("../exceptions/httpExceptions");

class ProductService {
    products = DB.Products;

    async getProducts() {
        const allProducts = await this.products.findAll().catch(err=> console.error(err));
        const inventory = await this.getTotalProductsGroupByUser();
        return { products: allProducts, inventory };
    }

    async getTotalProductsGroupByUser() {
        try {
            const data = await this.products.findAll({
                attributes: ['userId',
                    [sequelize.fn('sum', sequelize.col('price')), 'totalAmount'],
                    [sequelize.fn('COUNT', 0), 'count']
                ],
                include: [
                    { 
                        model: DB.Users, as: 'user',  
                    }
                ],
                    group: ['userId', 'user.id'],
                    raw: [true]
                }).catch(err=> console.error(err));

                return data;
        } catch(err) {
            new HttpException(400, err.message);
        }

    }
}

module.exports = ProductService;
