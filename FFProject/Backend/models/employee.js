'use strict';
const db = require('../models/index');
const {task}=db;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //employee.hasMany(task,{targetKey:"eId",foreignKey:"id"});
      //task.belongsTo(employee);
      //employee.hasMany(task,{foreignKey:"eId",targetKey:"id"})
    }
  }
  employee.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    gdoId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'gdos',
        key:'id'
      }
    },
    projId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'projects',
        key:'id'
      }
    },
    roleId: {
      type:DataTypes.STRING,
      allowNull:false,
      references:{
        model:'roles',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};