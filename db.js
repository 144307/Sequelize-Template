// sqlite3 DB.db "VACUUM;" создание пустой базы
// новое, подтверждено или отменено
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/DB.db",
});

const { OrderProductMapping, OrderTable, ProductTable, UserTable } =
  require("./models/init-models")(sequelize);

module.exports = {
  initDB: async function () {
    console.log("-db initDB");
    await UserTable.sync({ force: true });
    await OrderTable.sync({ force: true });
    await ProductTable.sync({ force: true });
    await OrderProductMapping.sync({ force: true });
  },
  getOrderList: async function () {
    console.log("-db getOrderList");
    const [results, metadata] = await sequelize.query(
      "SELECT product_table.id, group_concat (product_name, ' ~ ') AS products_in_this_order FROM order_product_mapping JOIN order_table ON order_reference = order_table.id JOIN product_table ON product_reference = product_table.id GROUP BY product_table.id;"
    );
    console.log("TEST:", results, metadata);
  },
  getProductList: async function () {
    console.log("-db getProductList");
    let products = await ProductTable.findAll({ attributes: ["product_name"] });
    // console.log(products.every((user) => user instanceof ProductTable)); // true
    // console.log("All users:", JSON.stringify(products, null, 2));
    // console.log("products", JSON.stringify(products));
    return JSON.stringify(products);
  },
  addUser: async function () {
    console.log("-db addUser");
    const newUser = UserTable.create();
  },
  addOrder: async function (cart) {
    console.log("-db addOrder");
    const newOrder = OrderTable.create({
      userId: 3,
      address: "address",
      status: "новое",
    });
  },
  // addProductToOrder: async function (userID, productID) {
  //   console.log("-db addProductToOrder");
  //   const addedProduct = OrderProductMapping.create({
  //     userID: 3,
  //     address: "address",
  //   });
  // },
  changeStatus: async function (orderID, newStatus) {
    console.log("-db change status");
    let order = await OrderTable.findByPk(orderID);
    // console.log(orders.every((user) => user instanceof order_table)); // true
    console.log("All orders:", JSON.stringify(order, null, 2));
    console.log("order:", order.status);
    if (order.status == "новое") {
      order.status = newStatus;
      order.save();
    }
  },
};
