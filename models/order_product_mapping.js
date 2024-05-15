const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderProductMapping', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    orderReference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'order_reference'
    },
    productReference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'product_reference'
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_product_mapping',
    timestamps: false
  });
};
