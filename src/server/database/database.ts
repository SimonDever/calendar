import Sequelize = require("sequelize");
const env = 'development' || process.env.NODE_ENV;
const config = require("../../../dbconfig.json")[env];
console.log(env);

export default class Database {
    static sequelize = new Sequelize(config.database, config.username, config.password, config);

    static users = require('./models/userModel').default(Database.sequelize);
}