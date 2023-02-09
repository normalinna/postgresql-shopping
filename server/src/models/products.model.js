const { Model, DataTypes } = require("sequelize");
const UserModel = require("./users.model")

class ProductModel extends Model {
    
    static init(sequelize) {
        return super.init(
            {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                title: {
                    allowNull: false,
                    type: DataTypes.STRING(255),
                },
                description: {
                    allowNull: false,
                    type: DataTypes.TEXT('medium'),
                },
                price: {
                    allowNull: false,
                    type: DataTypes.FLOAT,
                },
                userId: {
                    allowNull: false,
                    type: DataTypes.INTEGER
                }
            },
            {
                tableName: "products",
                sequelize,
                timestamps: false
            },
        )
    }

    static associate(model) {
        this.belongsTo(model.Users, {foreignKey: 'userId', as: 'user' })
    }
}

module.exports = ProductModel;