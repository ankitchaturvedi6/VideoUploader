const { DataTypes, Model, Op } = require("sequelize");
const User = require("./user");
const sequelize = require("../utils/Database");

class Video extends Model {
  static async insert(params) {
    try {
      await Video.create(params);
      return true;
    } catch (error) {
      return false;
    }
  }
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING(64),
    },
    fileName: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    destination: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    photoId: {
      type: DataTypes.STRING(255),
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelize,
  }
);

module.exports = Video;
