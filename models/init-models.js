var DataTypes = require("sequelize").DataTypes;
var _OrderProductMapping = require("./order_product_mapping");
var _OrderTable = require("./order_table");
var _ProductTable = require("./product_table");
var _UserTable = require("./user_table");

function initModels(sequelize) {
  var OrderProductMapping = _OrderProductMapping(sequelize, DataTypes);
  var OrderTable = _OrderTable(sequelize, DataTypes);
  var ProductTable = _ProductTable(sequelize, DataTypes);
  var UserTable = _UserTable(sequelize, DataTypes);

  OrderTable.belongsTo(UserTable, { as: "user", foreignKey: "userId"});
  UserTable.hasMany(OrderTable, { as: "orderTables", foreignKey: "userId"});

  return {
    OrderProductMapping,
    OrderTable,
    ProductTable,
    UserTable,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
