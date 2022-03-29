const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          review_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          critic_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'critic',
              key: 'id'
            }
          },
          post_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'post',
              key: 'id'
            }
        }},
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'review'
          }
          )
          module.exports = Review;