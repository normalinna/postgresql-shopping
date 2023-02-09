const { Model, DataTypes } = require("sequelize");

class CartModel extends Model {
    
    static init(sequelize) {
        return super.init(
            {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                userId: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                }
            },
            {
                tableName: "carts",
                sequelize,
                timestamps: false
            },
        )
    }

    static associate(model) {
        this.belongsTo(model.Users, {foreignKey: 'userId', as: 'users' });
    }
}

module.exports = CartModel;
