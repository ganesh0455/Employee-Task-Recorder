'use strict';
// const db=require('../models/index');
// const {employee,gdo,project,role,task}=db;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // project.hasMany(employee);
      // employee.belongsTo(project);
    }
  }
  project.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    projName: {
      allowNull:false,
      type:DataTypes.INTEGER
    },
    gdoId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'gdos',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};