'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DCS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DCS.init({
    doctorID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER,
    specialtyID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DCS',
  });
  return DCS;
};