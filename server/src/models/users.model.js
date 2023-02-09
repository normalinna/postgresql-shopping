const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                email: {
                    allowNull: false,
                    type: DataTypes.STRING(255),
                },
                password: {
                    allowNull: false,
                    type: DataTypes.STRING(255),
                },
                role: {
                    allowNull: false,
                    type: DataTypes.ENUM('user', 'seller'),
                }
            },
            {
                tableName: "users",
                sequelize,
                timestamps: false
            }
        )
    }

    static associate(model) {
        this.hasMany(model.Products, {foreignKey: 'userId', as: 'products' })
    }
}

module.exports = UserModel;