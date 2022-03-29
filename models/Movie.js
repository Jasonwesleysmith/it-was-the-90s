const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        critic_id: body.critic_id,
        movie_id: body.movie_id
      }).then(() => {
        return Movie.findOne({
          where: {
            id: body.movie_id
          },
          attributes: [
            'id',
            'movie_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }

  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      movie_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      critic_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'critic',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'movie'
    }
  );
  
  module.exports = Movie;
  