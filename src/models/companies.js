'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.companies
        , {
          foreignKey: "companyId",
          targetKey: "companyId",
        });
    }
  }
  companies.init({
    companyId: { type: DataTypes.STRING,
      primaryKey: true},
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    ceo: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companies',
  });
  return companies;
};