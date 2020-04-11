'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
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
var sha512 = function(password, salt){
    const hash = crypto.createHash('sha512');
    // var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password + salt);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

/**
* hash password with sha1.
* @function
* @param {string} password - List of required fields.
* @param {string} salt - Data to be validated.
*/
var sha1 = function(password, salt){
   var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha1 */
   hash.update(password);
   var value = hash.digest('hex');
   return {
       salt:salt,
       passwordHash:value
   };
};


const password = 'Hung1234';
const hashedPassword = '535143bd289d4c18d7de6097c28c120f488546b79c957ac7b1b159d2a2142e1a86d8984e8bad97d897df954bbf7e935eea16578a50d9a66ffea0628795aa86ba';
const salt = '064d1d8edc6b555ae8c805e272a5c2094897c056267e85b6108bdea8d2d29529fe1da33cba6ff09aadd29cdc336bd0636fb157223ad70917e7401a467bdd646c';

// const salt = 'eefa643b477cde9998074133d81fb9efcd03f977e140a6aa14e2965d8845cd61a9be929381c3f1981d642301334007b89a19e5c9101204fa09f3e4cc0d6979df'

console.log(sha512(password, salt))

// console.log(hashedPassword)
// saltHashPassword('123123');
// saltHashPassword('MYPASSWORD');