'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sectors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.companies, {
        foreignKey: "companyId",
        targetKey: "companyId",
            
      });
    }
  }
  sectors.init({
    companyId: { type: DataTypes.STRING,
      primaryKey: true},
    score: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'sectors',
  });
  return sectors;
};