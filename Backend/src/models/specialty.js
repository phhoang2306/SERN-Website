'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sepcialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sepcialty.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Sepcialty',
  });
  return Sepcialty;
};