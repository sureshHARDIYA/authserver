module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      system_id: {
        type: Sequelize.STRING(50),
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
      secret_question: {
        type: Sequelize.STRING(255),
      },
      secret_answer: {
        type: Sequelize.STRING(255),
      },
      creator: {
        type: Sequelize.INTEGER(10),
      },
      date_created: {
        type: Sequelize.DATE,
      },
      changed_by: {
        type: Sequelize.INTEGER(10),
      },
      date_changed: {
        type: Sequelize.DATE,
      },
      person_id: {
        type: Sequelize.INTEGER(10),
      },
      retired: {
        type: Sequelize.STRING,
      },
      retired_by: {
        type: Sequelize.INTEGER(10),
      },
      date_retired: {
        type: Sequelize.DATE,
      },
      retire_reason: {
        type: Sequelize.STRING(255),
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

