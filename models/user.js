'use strict';

const { Model } = require('sequelize');
const { GENDERS } = require('./../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  // unique, allowNull, validate
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      passwHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isBefore: new Date().toISOString(),
        },
      },
      gender: {
        type: DataTypes.STRING(10),
        validate: {
          isIn: [GENDERS],
        },
      },
      image: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
// underscored:true :
// {firstName: 'Test'} => first_name
//                          Test
