'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, {foreignKey: 'positionID', as: 'positionData'})
      Allcode.hasMany(models.User, {foreignKey: 'gender',as: 'genderData'})
      Allcode.hasMany(models.Schedule, {foreignKey: 'timeType',as: 'timeData'})
      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'priceID',as: 'priceData'})
      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'provinceID',as: 'provinceData'})
      Allcode.hasMany(models.Doctor_Info, {foreignKey: 'paymentID',as: 'paymentData'})
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};