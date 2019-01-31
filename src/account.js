const assert = require('assert');
const _ = require('lodash');

const USERS = {
  'adminpassword': {
    email: 'admin@mhof.ml',
    email_verified: true,
  },
  'sureshpassword': {
    email: 'suresh@mhof.ml',
    email_verified: true,
  },
  'nirmalpassword': {
    email: 'nirmal@mhof.ml',
    email_verified: true,
  },
};

class Account {
  constructor(id) {
    this.accountId = id;
  }

  claims() {
    return Object.assign({}, USERS[this.accountId], {
      sub: this.accountId,
    });
  }

  static async findById(ctx, id, token) {
    return new Account(id);
  }

  static async authenticate(email, password) {
    assert(password, 'password must be provided');
    assert(email, 'email must be provided');
    const lowercased = String(email).toLowerCase();
    const id = _.findKey(USERS, { email: lowercased });
    assert(id, 'invalid credentials provided');
    return new this(id);
  }
}

module.exports = Account;
