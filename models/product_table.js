const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductTable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    productName: {
      type: "",
      allowNull: true,
      field: 'product_name'
    }
  }, {
    sequelize,
    tableName: 'product_table',
    timestamps: false
  });
};
