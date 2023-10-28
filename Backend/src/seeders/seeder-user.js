'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
        email: 'hh2306@gmail.com',
        fullname: 'PHAN HUY HOANG',
        password: '123456',
        address: 'HCM',
        gender: 1,
        type: 'ROLE',
        key: 'R1'
    }]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};