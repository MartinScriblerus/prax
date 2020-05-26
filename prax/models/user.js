
const Message = require('./Message')


var bcrypt = require("bcryptjs");

// ========================================================================
//  Creating our User model
// ========================================================================

// Set it as anexport because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", 
  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
      username: {
        type: DataTypes.STRING,
        allowNull: false
        },
      password: {
        type: DataTypes.STRING,
        allowNull: false
        },
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          // TK BRING THIS BACK AFTER TESTING
          // validate: {
          //   isEmail: true
          // }
        },
      bandName: {
        type: DataTypes.STRING,
        allowNull: true
        },
      instrument: {
        type: DataTypes.STRING,
        allowNull: true
        },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.CURRENT_TIMESTAMP,
        allowNull: false
        },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.CURRENT_TIMESTAMP,
        allowNull: false
        },    
      },

        {
        associate:function(models){
          User.hasOne(models.Message);
        }
    }
  );

  // Creating a custom method for our User model. 
  // This will check if an unhashed password entered by the 
  // user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  console.log("hashing");

  
  return User;
};