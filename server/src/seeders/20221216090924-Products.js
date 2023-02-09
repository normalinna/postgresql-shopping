'use strict';
const { faker } = require("@faker-js/faker");

const products = [];

const createRandomUser = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(1, 1000, 2),
    userId: faker.datatype.number({max: 5, min: 3}),
  };
}

Array.from({ length: 10 }).forEach(() => {
  products.push(createRandomUser());
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
