const { Model, DataTypes } = require("sequelize");

class CartItemModel extends Model {
    
    static init(sequelize) {
        return super.init(
            {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                quantity: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
                cartId: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
                productId: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
            },
            {
                tableName: "cartItems",
                sequelize,
                timestamps: false
            },
        )
    }

    static associate(model) {
        this.belongsTo(model.Carts, {foreignKey: 'cartId', as: 'carts' });
        this.belongsTo(model.Products, {foreignKey: 'productId', as: 'products' });
    }
}

module.exports = CartItemModel;
