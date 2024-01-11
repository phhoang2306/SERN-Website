'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_info', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        doctorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
        priceID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        provinceID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        paymentID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        addressClinic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        nameClinic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        note:  {
        type: Sequelize.STRING
      },
        count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor_info');
  }
};