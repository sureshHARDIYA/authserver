// Helper function to create a single user for testing purposes

const {User} = require('./db');

const defaultUser = new User({
  username: 'test_username',
  password: 'test_password',
});

defaultUser.save();
