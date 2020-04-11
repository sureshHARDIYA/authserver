const { authenciate } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    user_id: {
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    system_id: DataTypes.STRING(50),
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(128),
    salt: DataTypes.STRING(128),
    secret_question: DataTypes.STRING(255),
    secret_answer: DataTypes.STRING(255),
    creator: DataTypes.INTEGER(10),
    date_created: DataTypes.DATE,
    changed_by: DataTypes.INTEGER(10),
    date_changed: DataTypes.DATE,
    person_id: DataTypes.INTEGER(10),
    retired: DataTypes.STRING,
    retired_by: DataTypes.INTEGER(10),
    date_retired: DataTypes.DATE,
    retire_reason: DataTypes.STRING(255),
    uuid: DataTypes.STRING(38),
  }, {
    timestamps: false
  });

  User.findByUsername = function(username) {
    return this.findOne({ username });
  };

  User.authenticate = async function(username, password) {
    const user = await this.findOne({ username });

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
