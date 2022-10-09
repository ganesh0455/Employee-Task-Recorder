'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      gdoId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'gdos',
          key:'id'
        }
      },
      projId: {
        type: Sequelize.INTEGER,
        references:{
          model:'projects',
          key:'id'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        references:{
          model:'roles',
          key:'id'
        }
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
    await queryInterface.dropTable('employees');
  }
};