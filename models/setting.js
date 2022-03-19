const { DataTypes, Model, Op } = require("sequelize");
const User = require("./user");
const sequelize = require("../utils/Database");

class Setting extends Model {
  getName() {
    const name = this.name;
    if (name.includes("option")) {
      return name.replace("option-", "");
    }
    return name;
  }

  static async fetchVideoTypes() {
    try {
      const result = await Setting.findAll({
        where: {
          name: {
            [Op.like]: "%option%",
          },
        },
      });

      return result.length;
    } catch (error) {
      return null;
    }
  }

  static async fetchAll() {
    const result = await Setting.findAll();
    const options = new Set();
    result.forEach((setting) => {
      options.add(setting.getName());
    });
    return options;
  }

  static async insertAll(params) {
    const entries = [];

    for (let [key, value] of Object.entries(params)) {
      entries.push({
        name: key,
        value: value,
      });
    }
    try {
      await Setting.destroy({
        where: {
          name: { [Op.ne]: null },
        },
      });
      await Setting.bulkCreate(entries);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateSettings(params) {}
}

Setting.init(
  {
    name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelize,
  }
);

module.exports = Setting;
