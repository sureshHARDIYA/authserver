const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/med-auth');

const {
  Schema,
} = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Export model(s)
module.exports = {
  User,
};
