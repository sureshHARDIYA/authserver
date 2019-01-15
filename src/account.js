const assert = require('assert');
const _ = require('lodash');

const USERS = {
  '23121d3c-84df-44ac-b458-3d63a9a05497': {
    email: 'foo@example.com',
    email_verified: true,
  },
  'c2ac2b4a-2262-4e2f-847a-a40dd3c4dcd5': {
    email: 'bar@example.com',
    email_verified: false,
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

  static async findById(ctx, id) {
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
