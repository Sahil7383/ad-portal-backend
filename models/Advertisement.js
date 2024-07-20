const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Advertisement = sequelize.define("Advertisement", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Advertisement;
