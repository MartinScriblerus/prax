import Sequelize from 'sequelize';
import UserModel from './models/user';
import MessageModel from '.models/Message'
import RelationModel from './models/Relation'

const sequelize = new Sequelize('process.env.DB_DATABASE', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});


const User = UserModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize)
const Relation = RelationModel(sequelize, Sequelize)
sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('User db and user table have been created');
});

module.exports = { User, Message, Relation };