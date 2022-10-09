'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eId: {
        type: Sequelize.INTEGER,
        references:{
          model:'employees',
          key:'id'
        }
      },
      tasks: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATEONLY
      },
      Mstatus:{
        allowNull:false,
        type: Sequelize.TEXT
      },
      Astatus:{
        allowNull:false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};