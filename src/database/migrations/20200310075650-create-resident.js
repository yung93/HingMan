'use strict';
// import moment from "moment";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'addressId',
        }
      },
      mobileNo: {
        type: Sequelize.STRING
      },
      homeNo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('F', 'M')
      },
      em: {
        type: Sequelize.BOOLEAN
      },
      birthday: {
        type: Sequelize.DATE
      },
      log: {
        type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Residents');
  }
};