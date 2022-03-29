const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    critic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "critic",
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movie",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "vote",
  }
);

module.exports = Vote;
