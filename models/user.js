const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = require("../utils/Database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
  }
);

module.exports = User;
