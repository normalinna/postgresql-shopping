const Sequelize = require("sequelize");
const bdConfig = require("../config/index");
const UserModel = require("../models/users.model");
const ProductModel = require("../models/products.model");
const CartModel = require("../models/carts.model");
const CartItemModel = require("../models/cartItems.model");

const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize.Sequelize(bdConfig[env].database, bdConfig[env].username, bdConfig[env].password, {
    host: bdConfig[env].host,
    dialect:  bdConfig[env].dialect,
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("The database is connected.");
    })
    .catch((error) => {
        console.log(`Unable to connect to the database: ${error}.`);
    });

    const models = {
        Users: UserModel.init(sequelize, Sequelize),
        Products: ProductModel.init(sequelize, Sequelize),
        Carts: CartModel.init(sequelize, Sequelize),
        CartItems: CartItemModel.init(sequelize, Sequelize)
    };

    Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const DB = {
    ...models,
    sequelize,
    Sequelize
};

module.exports = DB;