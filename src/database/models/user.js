const { authenciate } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    user_id: {
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(128),
    salt: DataTypes.STRING(128),
    uuid: DataTypes.STRING(38),
  }, {
    timestamps: false
  });


  User.findById = async function (id) {
    if (id) {
      return await this.findOne({ where: { user_id: id } });
    }
  };

  User.findByUsername = function(username) {
    return this.findOne({ where: { username } });
  };

  User.prototype.authenticate = function (password) {
    return authenciate(password, this.password, this.salt);
  }

  User.authenticate = async function(username, password) {
    const user = await User.findByUsername(username);

    if (!user) {
      throw new Error(`${username} not exist!!`);
    }

    const validate = authenciate(password, user.password, user.salt);

    if (!validate) {
      throw new Error('Password is invalid');
    }

    return true;
  };

  return User;
};
