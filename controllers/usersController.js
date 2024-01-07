const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('./../models');

// const passw = '123;';
const HASH_SALT = 10;
// const passwHash = hashSync(passw, HASH_SALT);
// console.log('passwHash :>> ', passwHash);

// шифрування
// '123' -> 'kjnkjsdfcs4fd535d4c23sd4c2gxxgkbf'
// '123' <- 'kjnkjsdfcs4fd535d4c23sd4c2gxxgkbf'
// хешування
// '123' -> 'kjnkjsdfcs4fd535d4c23sd4c2gxxgkbf'

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    // захешувати пароль
    body.passwHash = hashSync(body.passwHash, HASH_SALT);

    const createdUser = await User.create(body);

    if (!createdUser) {
      return res.status(400).send('Something went wrong');
    }

    // видалити всі непотрібні або сек'юрні властивості

    // const preparedUser = { ...createdUser.get() };
    // delete preparedUser.passwHash;
    // delete preparedUser.createdAt;
    // delete preparedUser.updatedAt;

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send(preparedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {};
