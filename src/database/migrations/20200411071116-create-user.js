module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      username: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(128),
      },
      salt: {
        type: Sequelize.STRING(128),
      },
      uuid: {
        type: Sequelize.STRING(38),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

