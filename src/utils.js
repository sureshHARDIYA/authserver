const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  return { salt, password: hash.digest('hex') }
};

const encryption = (password) => sha512(password, genRandomString(16))

const authenciate = (password, hash, salt) => {
  const { password: hashPassword } = sha512(password, salt);
  return hashPassword === hash;
}

module.exports = {
  encryption,
  authenciate
}
