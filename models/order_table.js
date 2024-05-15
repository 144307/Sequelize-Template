const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderTable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      field: 'ID'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_table',
        key: 'ID'
      },
      field: 'user_id'
    },
    address: {
      type: "",
      allowNull: true
    },
    status: {
      type: "",
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_table',
    timestamps: false
  });
};
