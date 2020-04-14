const Database = require('./database/models');

class Account {
  constructor(id) {
    this.accountId = id;
  }

  static async findAccount(ctx, id) {
    console.log('findAccount:', findAccount)
    const account = await Database.user.findById(id);

    if (!account) {
      return undefined;
    }

    return {
      accountId: id,

      async claims() {
        return {
          username: account.username,
          sub: account.user_id.toString(),
        };
      },
    };
  }

  static async authenticate(username, password) {
      const user = await Database.user.findByUsername(username);

      if (!user) {
        throw new Error(`${username} not found`);
      }

      if (!user.authenticate(password)) {
        throw new Error('Password is invalid');
      }

      return user
  }
}

module.exports = Account;
