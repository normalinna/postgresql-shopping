'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      cartId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'carts',
          key: 'id'
        }, 
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      productId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'products',
          key: 'id'
        }, 
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cartItems');
  }
};
