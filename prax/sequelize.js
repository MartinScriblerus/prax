import Sequelize from 'sequelize';
import UserModel from './models/user';
import MessageModel from '.models/Message'
import RelationModel from './models/Relation'

const sequelize = new Sequelize('user', 'test', 'test1234', {
  host: 'db',
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