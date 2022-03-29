const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our Critic model
class Critic extends Model {
  // set up method to run on instance data (per Critic) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for Critic model
Critic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    critic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newCriticData) {
        newCriticData.password = await bcrypt.hash(newCriticData.password, 10);
        return newCriticData;
      },

      async beforeUpdate(updatedCriticData) {
        updatedCriticData.password = await bcrypt.hash(updatedCriticData.password, 10);
        return updatedCriticData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'critic'
  }
);

module.exports = Critic;