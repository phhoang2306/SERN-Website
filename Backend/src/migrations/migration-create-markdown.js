'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('markdowns', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      }, 
      contentMarkdown: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      doctorID: {
        type: Sequelize.INTEGER
      },
      specialtyID: {
        type: Sequelize.INTEGER
      },
      clinicID: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('markdowns');
  }
};