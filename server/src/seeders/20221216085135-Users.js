'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'customer1@gmail.com',
      password: '$2a$10$C47qYJtnXv4wq8JlALhAL.qKupZgEIsP6kuYN9o1UryPlSr6sEmZK', // 123456
      role: 'user',
    },
    {
      email: 'customer2@gmail.com',
      password: '$2a$10$C47qYJtnXv4wq8JlALhAL.qKupZgEIsP6kuYN9o1UryPlSr6sEmZK', // 123456
      role: 'user',
    },
    {
      email: 'seller1@gmail.com',
      password: '$2a$10$C47qYJtnXv4wq8JlALhAL.qKupZgEIsP6kuYN9o1UryPlSr6sEmZK', // 123456
      role: 'seller',
    },
    {
      email: 'seller2@gmail.com',
      password: '$2a$10$C47qYJtnXv4wq8JlALhAL.qKupZgEIsP6kuYN9o1UryPlSr6sEmZK', // 123456
      role: 'seller',
    },
    {
      email: 'seller3@gmail.com',
      password: '$2a$10$C47qYJtnXv4wq8JlALhAL.qKupZgEIsP6kuYN9o1UryPlSr6sEmZK', // 123456
      role: 'seller',
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    }
  }
};
