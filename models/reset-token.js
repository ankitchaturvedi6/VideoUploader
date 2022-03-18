const { DataTypes, Model } = require("sequelize");
const User = require("./user");
const sequelize = require("../utils/Database");

class ResetToken extends Model {}

ResetToken.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    expires: {
      type: DataTypes.TIME,
    },
  },
  {
    sequelize: sequelize,
  }
);

module.exports = ResetToken;
