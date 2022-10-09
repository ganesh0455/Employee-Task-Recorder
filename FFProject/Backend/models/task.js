'use strict';
// const db=require('../models/index');
// const {employee,gdo,project,role,task}=db;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eId: {
      type:DataTypes.INTEGER,
      references:{
        model:'employees',
        key:'id'
      }
    },
    tasks: {
      allowNull:false,
      type: DataTypes.TEXT
    },
    date: {
      allowNull:false,
      type:DataTypes.DATEONLY
    },
    Mstatus:{
      allowNull:false,
      type: DataTypes.TEXT
    },
    Astatus:{
      allowNull:false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};