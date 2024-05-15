const SequelizeAuto = require("sequelize-auto");

const output = "./models";
const options = {
  directory: output,
  caseFile: "l",
  caseModel: "p",
  caseProp: "c",
  lang: "js",
  useDefine: false,
  singularize: true,
  spaces: true,
  indentation: 2,
};

const config = {
  dialect: "sqlite",
  host: "localhost",
  dbname: "./db/DB.db",
  user: "dontcare",
  pass: "...",
  ...options,
};

// @ts-ignore
var auto = new SequelizeAuto(config.dbname, config.user, config.pass, config);

auto.run().then((data) => {
  const tableNames = Object.keys(data.tables);
  console.log(tableNames);
});
