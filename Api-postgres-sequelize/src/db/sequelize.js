import { Sequelize } from'sequelize';
import env from '../config/env.js'

const { database } = env;


const sequelize = new Sequelize(database.name,
    database.username, database.password, {
  host: database.host,
  dialect: database.dialect,
});


export default sequelize;