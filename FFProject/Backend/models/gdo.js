'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gdo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // gdo.hasMany(project,{targetKey:"gdoId",foreignKey:"id"});
      // project.belongsTo(gdo);
      // gdo.hasMany(employee,{targetKey:"gdoId",foreignKey:"id"});
      // employee.belongsTo(gdo);
    }
  }
  gdo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    gdoName: {
      allowNull:false,
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'gdo',
  });
  return gdo;
};